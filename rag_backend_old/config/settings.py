from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    # API Keys
    openrouter_api_key: str
    QWEN_EMBEDDING_API_KEY: str


    # Database URLs
    qdrant_url: str
    qdrant_api_key: Optional[str] = None
    neon_db_url: str

    # Application settings
    app_name: str = "Physical AI RAG Backend"
    debug: bool = False
    embedding_model: str = "Alibaba-NLP/gte-large-en-v1.5"  # Qwen-related embedding model
    chat_model: str = "qwen/qwen-2-72b-instruct"  # Default chat model
    max_context_length: int = 3072  # Maximum context length in tokens
    max_chunk_size: int = 1024  # Maximum chunk size in characters
    top_k: int = 5  # Number of chunks to retrieve
    embedding_dimensions: int = 1024  # Dimensions for the embedding model

    class Config:
        env_file = ".env"


settings = Settings()