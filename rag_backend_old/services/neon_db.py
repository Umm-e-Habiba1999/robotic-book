import asyncpg
from config.settings import settings
import logging
from typing import List, Dict, Any, Optional
from datetime import datetime

logger = logging.getLogger(__name__)


class NeonDBService:
    async def get_connection(self):
        """Get connection to Neon Postgres database"""
        try:
            conn = await asyncpg.connect(settings.neon_db_url)
            return conn
        except Exception as e:
            logger.error(f"Failed to connect to Neon database: {e}")
            raise
    
    async def init_tables(self):
        """Initialize Neon Postgres database tables"""
        conn = await self.get_connection()
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
    
    async def save_document(self, doc_id: str, title: str, content: str, source_path: str = None):
        """Save document metadata to Neon DB"""
        conn = await self.get_connection()
        try:
            await conn.execute("""
                INSERT INTO documents (doc_id, title, content, source_path)
                VALUES ($1, $2, $3, $4)
                ON CONFLICT (doc_id) 
                DO UPDATE SET 
                    title = EXCLUDED.title,
                    content = EXCLUDED.content,
                    source_path = EXCLUDED.source_path,
                    updated_at = CURRENT_TIMESTAMP
            """, doc_id, title, content, source_path)
        except Exception as e:
            logger.error(f"Error saving document to Neon DB: {e}")
            raise
        finally:
            await conn.close()
    
    async def save_chunk_metadata(self, doc_id: str, chunk_index: int, content: str, embedding_metadata: Dict[str, Any]):
        """Save chunk metadata to Neon DB"""
        conn = await self.get_connection()
        try:
            await conn.execute("""
                INSERT INTO chunks (doc_id, chunk_index, content, embedding_metadata)
                VALUES ($1, $2, $3, $4)
            """, doc_id, chunk_index, content, embedding_metadata)
        except Exception as e:
            logger.error(f"Error saving chunk metadata to Neon DB: {e}")
            raise
        finally:
            await conn.close()
    
    async def create_session(self, session_id: str):
        """Create a new chat session"""
        conn = await self.get_connection()
        try:
            await conn.execute("""
                INSERT INTO sessions (session_id)
                VALUES ($1)
                ON CONFLICT (session_id) DO NOTHING
            """, session_id)
        except Exception as e:
            logger.error(f"Error creating session in Neon DB: {e}")
            raise
        finally:
            await conn.close()
    
    async def save_message(self, session_id: str, role: str, content: str):
        """Save a message to the chat history"""
        conn = await self.get_connection()
        try:
            # Ensure session exists
            await self.create_session(session_id)
            
            await conn.execute("""
                INSERT INTO messages (session_id, role, content)
                VALUES ($1, $2, $3)
            """, session_id, role, content)
            
            # Update last accessed time for the session
            await conn.execute("""
                UPDATE sessions 
                SET last_accessed = CURRENT_TIMESTAMP 
                WHERE session_id = $1
            """, session_id)
        except Exception as e:
            logger.error(f"Error saving message to Neon DB: {e}")
            raise
        finally:
            await conn.close()
    
    async def get_conversation_history(self, session_id: str, limit: int = 10) -> List[Dict[str, Any]]:
        """Get conversation history for a session"""
        conn = await self.get_connection()
        try:
            rows = await conn.fetch("""
                SELECT role, content, timestamp 
                FROM messages 
                WHERE session_id = $1 
                ORDER BY timestamp DESC 
                LIMIT $2
            """, session_id, limit)
            
            # Reverse to get chronological order
            history = [{"role": row['role'], "content": row['content'], "timestamp": row['timestamp']} 
                      for row in reversed(rows)]
            return history
        except Exception as e:
            logger.error(f"Error getting conversation history from Neon DB: {e}")
            return []
        finally:
            await conn.close()
    
    async def get_document_by_path(self, source_path: str):
        """Get document by source path"""
        conn = await self.get_connection()
        try:
            row = await conn.fetchrow("""
                SELECT doc_id, title, content 
                FROM documents 
                WHERE source_path = $1
            """, source_path)
            return row
        except Exception as e:
            logger.error(f"Error getting document from Neon DB: {e}")
            return None
        finally:
            await conn.close()