"""
FastAPI backend for RAG chatbot
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from dotenv import load_dotenv
from sentence_transformers import SentenceTransformer
import openai
from qdrant_client import QdrantClient
from qdrant_client.http import models
from contextlib import asynccontextmanager

load_dotenv()

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Initialize resources on startup"""
    print("Loading embedding model...")
    try:
        app.embedding_model = SentenceTransformer('BAAI/bge-small-en-v1.5')
        print("Embedding model loaded successfully")
    except Exception as e:
        print(f"Error loading embedding model: {e}")
        app.embedding_model = None

    # Initialize OpenRouter client (using OpenAI library with OpenRouter endpoint)
    app.openrouter_client = openai.OpenAI(
        api_key=os.getenv("OPENROUTER_API_KEY"),
        base_url="https://openrouter.ai/api/v1"
    )

    # Initialize Qdrant client
    app.qdrant_client = QdrantClient(
        url=os.getenv("QDRANT_URL"),
        api_key=os.getenv("QDRANT_API_KEY"),
    )

    # Collection name
    COLLECTION_NAME = "book_content"
    app.collection_name = COLLECTION_NAME

    try:
        # Check if collection exists, create if it doesn't
        collections = app.qdrant_client.get_collections()
        collection_names = [c.name for c in collections.collections]

        if app.collection_name not in collection_names:
            app.qdrant_client.create_collection(
                collection_name=app.collection_name,
                vectors_config=models.VectorParams(
                    size=384,  # bge-small-en-v1.5 dimension
                    distance=models.Distance.COSINE
                )
            )
            print(f"Created collection: {app.collection_name}")
        else:
            print(f"Collection {app.collection_name} already exists")
    except Exception as e:
        print(f"Error initializing Qdrant: {e}")

    yield  # This is where the application runs

app = FastAPI(title="Physical AI Textbook RAG API", lifespan=lifespan)

# CORS - allow frontend to call API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str
    selected_text: str = None
    language: str = "en"  # Add language support: 'en' or 'ur'

class ChatResponse(BaseModel):
    response: str
    sources: list = []

@app.get("/api/health")
async def health():
    """Health check endpoint"""
    return {
        "status": "ok",
        "embedding_model_loaded": hasattr(app, 'embedding_model') and app.embedding_model is not None
    }

@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Main chat endpoint
    Accepts: user message and optional selected text
    Returns: AI response and sources
    """
    try:
        # Debug: Log the received language
        print(f"[DEBUG] Received request - Language: {request.language}, Message: {request.message[:50]}...")
        # If there's selected text, use it as context directly
        if request.selected_text and len(request.selected_text.strip()) > 0:
            # Use the selected text as context, potentially enhanced with vector search
            context = f"SELECTED TEXT FROM BOOK:\n{request.selected_text}\n\nRELATED INFORMATION:"

            # Perform a secondary search based on the selected text to get more context
            try:
                # Generate embedding for the selected text
                selected_text_embedding = app.embedding_model.encode(request.selected_text, convert_to_numpy=True).tolist()

                # Search for related content in the vector database
                search_results = app.qdrant_client.search(
                    collection_name=app.collection_name,
                    query_vector=selected_text_embedding,
                    limit=3  # Limit to 3 additional results
                )

                if search_results:
                    for i, result in enumerate(search_results, 1):
                        context += f"\n\n[Additional Context {i}]:\n{result.payload['text']}"
            except Exception as e:
                print(f"Error during secondary search: {e}")
                # If secondary search fails, just use the selected text as context
                context = f"SELECTED TEXT FROM BOOK:\n{request.selected_text}"
                search_results = []  # Set empty search results for source handling
        else:
            # Generate embedding for the query using our local model (NOT OpenAI!)
            query_embedding = app.embedding_model.encode(request.message, convert_to_numpy=True).tolist()

            # Search vector database for relevant content (reduced limit for faster search)
            search_results = app.qdrant_client.search(
                collection_name=app.collection_name,
                query_vector=query_embedding,
                limit=3  # Reduced from 5 to 3 for faster search
            )

            if not search_results:
                # Enhanced fallback context when no relevant information is found
                context = f"""I couldn't find specific information in the textbook to answer your question about '{request.message}'.

As an AI assistant for the Physical AI & Humanoid Robotics textbook, I recommend:
1. Reviewing the table of contents to locate relevant chapters
2. Checking the index for specific terms related to your question
3. Re-asking your question with more specific details

Please feel free to ask about specific chapters or concepts from the textbook, and I'll do my best to help you understand the material based on the available content."""
            else:
                context_parts = []
                for i, result in enumerate(search_results, 1):
                    context_parts.append(f"[Source {i}]:\n{result.payload['text']}\n")

                context = "\n".join(context_parts)

        # Create system and user prompts for OpenRouter
        if request.language == "ur":
            system_prompt = """You are an AI assistant helping students understand the Physical AI & Humanoid Robotics textbook.

Answer questions based ONLY on the provided context from the book. If the context doesn't contain enough information, say so clearly.

Be clear, concise, and educational in your responses.

IMPORTANT: You MUST respond in URDU language. Translate your entire response to Urdu."""

            user_prompt = f"""Context from the textbook:

{context}

---

Student's Question: {request.message}

IMPORTANT: Please provide a clear answer in URDU (اردو) language based on the context above. The student has selected Urdu as their preferred language, so your ENTIRE response must be in Urdu script."""
        else:
            system_prompt = """You are an AI assistant helping students understand the Physical AI & Humanoid Robotics textbook.

Answer questions based ONLY on the provided context from the book. If the context doesn't contain enough information, say so clearly.

Be clear, concise, and educational in your responses."""

            user_prompt = f"""Context from the textbook:

{context}

---

Student's Question: {request.message}

Please provide a clear answer based on the context above."""

        # Debug: Log which language mode is being used
        print(f"[DEBUG] Using language mode: {request.language}")
        print(f"[DEBUG] System prompt starts with: {system_prompt[:100]}...")

        # Call OpenRouter for chat completion (using faster Qwen 7B model)
        response = app.openrouter_client.chat.completions.create(
            model=os.getenv("CHAT_MODEL", "qwen/qwen-2.5-7b-instruct"),  # Faster 7B model
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.7,
            max_tokens=400  # Balanced for good answers and speed
        )

        # Extract the answer from the response
        answer = response.choices[0].message.content

        # Ensure the answer is not empty or None
        if not answer or answer.strip() == "":
            answer = "I found relevant information in the textbook, but I'm having trouble formulating a response. Please try rephrasing your question."

        # Prepare sources for response
        sources = []
        if not (request.selected_text and len(request.selected_text.strip()) > 0):
            for result in search_results[:3]:  # Limit to top 3 sources
                sources.append({
                    "text": result.payload["text"][:200] + "...",
                    "score": result.score
                })

        return ChatResponse(
            response=answer,
            sources=sources
        )

    except Exception as e:
        print(f"Error in chat endpoint: {e}")
        # Return a safe fallback response when there are errors
        return ChatResponse(
            response="I'm sorry, I couldn't process your request. Please try asking your question again.",
            sources=[]
        )

@app.get("/")
async def root():
    """Basic root endpoint"""
    return {"message": "Physical AI Textbook RAG API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)





