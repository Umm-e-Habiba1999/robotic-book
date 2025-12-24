import openai
from config.settings import settings
import asyncio
import logging
from typing import List, Dict, Any
import numpy as np

logger = logging.getLogger(__name__)

# Configure OpenAI client to use OpenRouter
client = openai.AsyncOpenAI(
    api_key=settings.openrouter_api_key,
    base_url="https://openrouter.ai/api/v1",
)


async def get_qwen_embeddings(texts: List[str]) -> List[List[float]]:
    """
    Get embeddings from Qwen model via OpenRouter
    Using Alibaba-NLP/gte-large-en-v1.5 as a Qwen-related embedding model
    """
    try:
        response = await client.embeddings.create(
            input=texts,
            model="Alibaba-NLP/gte-large-en-v1.5"  # Qwen-related embedding model
        )

        embeddings = []
        for data in response.data:
            embeddings.append(data.embedding)

        return embeddings
    except Exception as e:
        logger.error(f"Error getting Qwen embeddings: {e}")
        raise e


async def get_qwen_completion(messages: List[Dict[str, str]], model: str = "qwen/qwen-2-72b-instruct", max_tokens: int = 1024, temperature: float = 0.7):
    """
    Get completion from Qwen model via OpenRouter
    """
    try:
        response = await client.chat.completions.create(
            model=model,
            messages=messages,
            max_tokens=max_tokens,
            temperature=temperature
        )

        content = response.choices[0].message.content

        # Check if the response indicates the information is not in the context
        if content and ("not available in the book" in content.lower() or
                        "not found in the provided context" in content.lower() or
                        "no information provided" in content.lower()):
            return "This information is not available in the book."

        return content
    except Exception as e:
        logger.error(f"Error getting completion: {e}")
        raise


async def get_qwen_completion_with_context_check(query: str, context: str, chat_history: List[Dict[str, str]] = None, model: str = "qwen/qwen-2-72b-instruct", max_tokens: int = 1024, temperature: float = 0.7):
    """
    Get completion from Qwen model with specific context and proper formatting
    """
    try:
        messages = []

        # System message with instructions about using only provided context
        system_message = {
            "role": "system",
            "content": (
                "You are a helpful assistant for the Physical AI & Humanoid Robotics textbook. "
                "Answer questions based ONLY on the provided context. "
                "If the answer is not in the provided context, respond with: 'This information is not available in the book.' "
                f"Context: {context}"
            )
        }
        messages.append(system_message)

        # Add chat history if provided
        if chat_history:
            messages.extend(chat_history)

        # Add the current query
        messages.append({
            "role": "user",
            "content": query
        })

        response = await client.chat.completions.create(
            model=model,
            messages=messages,
            max_tokens=max_tokens,
            temperature=temperature
        )

        content = response.choices[0].message.content

        # Ensure the response follows the rule about unavailable information
        if content and ("not available in the book" in content.lower() or
                        "not found in the provided context" in content.lower() or
                        "no information provided" in content.lower()):
            return "This information is not available in the book."

        return content
    except Exception as e:
        logger.error(f"Error getting completion with context: {e}")
        raise