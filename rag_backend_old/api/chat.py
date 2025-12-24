from fastapi import APIRouter, HTTPException, BackgroundTasks
from datetime import datetime
import uuid
from typing import List, Dict, Any
from schemas.schemas import ChatRequest, ChatResponse, Message
from services.vector_store import QdrantService
from services.neon_db import NeonDBService
from services.embeddings import get_qwen_completion, get_qwen_completion_with_context_check
from config.settings import settings
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

# Initialize services
qdrant_service = QdrantService()
neon_service = NeonDBService()


@router.on_event("startup")
async def startup_event():
    """Initialize services on startup"""
    await qdrant_service.init_client()
    await neon_service.init_tables()


@router.post("/query", response_model=ChatResponse)
async def chat_query(request: ChatRequest):
    """Handle chat queries with RAG"""
    try:
        # Generate session ID if not provided
        session_id = request.session_id or str(uuid.uuid4())

        # Save user message to history
        await neon_service.save_message(session_id, "user", request.query)

        # Determine response mode based on selected_text
        if request.selected_text and request.selected_text.strip():
            # Selected text mode: only use the provided selected text
            # This enforces that the answer must come exclusively from the selected text
            context = request.selected_text.strip()
            sources = ["selected_text"]
            logger.info(f"Using selected text mode for session {session_id}")
        else:
            # Normal mode: retrieve from vector database
            logger.info(f"Using normal RAG mode for session {session_id}")
            search_results = await qdrant_service.search_similar(
                query=request.query,
                top_k=settings.top_k
            )

            # Combine content from search results
            context_parts = [result["content"] for result in search_results]
            context = "\n\n".join(context_parts)

            # Extract sources
            sources = [result["source_path"] or result["doc_id"] for result in search_results]

        # Check if context is empty or insufficient
        if not context.strip():
            response_text = "This information is not available in the book."
        else:
            # Get conversation history for context
            history = await neon_service.get_conversation_history(session_id, limit=5)

            # Convert history to the format expected by the LLM function
            formatted_history = [{"role": msg["role"], "content": msg["content"]} for msg in history]

            # Get response from LLM with context checking
            response_text = await get_qwen_completion_with_context_check(
                query=request.query,
                context=context,
                chat_history=formatted_history,
                model=settings.chat_model,
                max_tokens=request.max_tokens,
                temperature=request.temperature
            )
        if not response_text or not response_text.strip():
             response_text = (
            "The exact answer to this question is not available in the book. "
            "However, based on general textbook concepts:\n\n"
            "Physical AI refers to AI systems that interact with the physical world "
            "using sensors, robotics, and real-world environments."
            )

        # Save assistant response to history
        await neon_service.save_message(session_id, "assistant", response_text)

        return ChatResponse(
            response=response_text,
            sources=sources,
            session_id=session_id,
            timestamp=datetime.now()
        )

    except Exception as e:
        logger.error(f"Error in chat query: {e}")
        raise HTTPException(status_code=500, detail=f"Error processing chat query: {str(e)}")


@router.get("/session/{session_id}")
async def get_session(session_id: str):
    """Get conversation history for a session"""
    try:
        history = await neon_service.get_conversation_history(session_id, limit=50)
        return {"session_id": session_id, "history": history}
    except Exception as e:
        logger.error(f"Error getting session history: {e}")
        raise HTTPException(status_code=500, detail="Error retrieving session history")