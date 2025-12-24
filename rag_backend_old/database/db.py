import asyncpg
from config.settings import settings
import logging

logger = logging.getLogger(__name__)

async def get_neon_connection():
    """Get connection to Neon Postgres database"""
    try:
        conn = await asyncpg.connect(settings.neon_db_url)
        return conn
    except Exception as e:
        logger.error(f"Failed to connect to Neon database: {e}")
        raise


async def init_neon_db():
    """Initialize Neon Postgres database tables"""
    conn = await get_neon_connection()
    try:
        # Create documents table
        await conn.execute("""
            CREATE TABLE IF NOT EXISTS documents (
                id SERIAL PRIMARY KEY,
                doc_id TEXT UNIQUE NOT NULL,
                title TEXT NOT NULL,
                content TEXT NOT NULL,
                source_path TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        # Create chunks table
        await conn.execute("""
            CREATE TABLE IF NOT EXISTS chunks (
                id SERIAL PRIMARY KEY,
                doc_id TEXT REFERENCES documents(doc_id),
                chunk_index INTEGER NOT NULL,
                content TEXT NOT NULL,
                embedding_metadata JSONB,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        # Create sessions table for tracking conversations
        await conn.execute("""
            CREATE TABLE IF NOT EXISTS sessions (
                id SERIAL PRIMARY KEY,
                session_id TEXT UNIQUE NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                last_accessed TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        # Create messages table
        await conn.execute("""
            CREATE TABLE IF NOT EXISTS messages (
                id SERIAL PRIMARY KEY,
                session_id TEXT REFERENCES sessions(session_id),
                role VARCHAR(20) NOT NULL,  -- 'user' or 'assistant'
                content TEXT NOT NULL,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        logger.info("Neon database tables initialized successfully")
    except Exception as e:
        logger.error(f"Failed to initialize Neon database: {e}")
        raise
    finally:
        await conn.close()


# Qdrant setup
from qdrant_client import AsyncQdrantClient
from qdrant_client.http.models import Distance, VectorParams, PointStruct
import uuid


async def get_qdrant_client():
    """Get Qdrant client"""
    if settings.qdrant_api_key:
        client = AsyncQdrantClient(
            url=settings.qdrant_url,
            api_key=settings.qdrant_api_key,
            prefer_grpc=False  # Using HTTP for simplicity
        )
    else:
        client = AsyncQdrantClient(url=settings.qdrant_url)
    
    return client


async def init_qdrant_collection():
    """Initialize Qdrant collection for embeddings"""
    client = await get_qdrant_client()
    
    try:
        # Check if collection exists
        collections = await client.get_collections()
        collection_exists = any(col.name == "textbook_chunks" for col in collections.collections)
        
        if not collection_exists:
            # Create collection with appropriate dimensions for Qwen embeddings
            # Qwen embeddings typically have 1536 dimensions, but this may vary by model
            await client.create_collection(
                collection_name="textbook_chunks",
                vectors_config=VectorParams(size=1536, distance=Distance.COSINE),  # Will adjust based on actual embedding size
            )
            
            # Create payload index for faster filtering
            await client.create_payload_index(
                collection_name="textbook_chunks",
                field_name="doc_id",
                field_schema="keyword"
            )
            
            await client.create_payload_index(
                collection_name="textbook_chunks",
                field_name="source_path",
                field_schema="keyword"
            )
            
            logger.info("Qdrant collection 'textbook_chunks' created successfully")
        else:
            logger.info("Qdrant collection 'textbook_chunks' already exists")
    except Exception as e:
        logger.error(f"Failed to initialize Qdrant collection: {e}")
        raise