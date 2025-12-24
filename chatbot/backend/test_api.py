"""
Test script to verify Qwen API functionality
"""
import os
from dotenv import load_dotenv
import openai

load_dotenv()

# Initialize OpenRouter client (using OpenAI library with OpenRouter endpoint)
openrouter_client = openai.OpenAI(
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url="https://openrouter.ai/api/v1"
)

def test_qwen_api():
    """Test the Qwen API directly"""
    try:
        print("Testing Qwen API connection...")
        
        # Create a simple test prompt
        response = openrouter_client.chat.completions.create(
            model=os.getenv("CHAT_MODEL", "qwen/qwen-2.5-72b-instruct"),
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": "Hello, how are you?"}
            ],
            temperature=0.7,
            max_tokens=100
        )
        
        answer = response.choices[0].message.content
        print(f"✅ Qwen API test successful!")
        print(f"Response: {answer}")
        return True
        
    except Exception as e:
        print(f"❌ Qwen API test failed: {e}")
        return False

def test_embedding():
    """Test the embedding functionality"""
    try:
        print("\nTesting embedding functionality...")
        from sentence_transformers import SentenceTransformer
        
        embedding_model = SentenceTransformer('BAAI/bge-small-en-v1.5')
        test_text = "Hello, this is a test sentence."
        embedding = embedding_model.encode(test_text, convert_to_numpy=True).tolist()
        
        print(f"✅ Embedding test successful!")
        print(f"Embedding length: {len(embedding)}")
        return True
        
    except Exception as e:
        print(f"❌ Embedding test failed: {e}")
        return False

if __name__ == "__main__":
    print("Testing Qwen API and embedding functionality...")
    test_qwen_api()
    test_embedding()