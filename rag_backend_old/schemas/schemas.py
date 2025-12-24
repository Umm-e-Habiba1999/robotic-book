from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime


class Message(BaseModel):
    role: str  # "user" or "assistant"
    content: str
    timestamp: Optional[datetime] = None


class ChatRequest(BaseModel):
    query: str
    session_id: Optional[str] = None
    selected_text: Optional[str] = None  # If provided, use selected text mode
    history: Optional[List[Message]] = None
    max_tokens: Optional[int] = 1024
    temperature: Optional[float] = 0.7


class ChatResponse(BaseModel):
    response: str
    sources: List[str]  # Source document IDs or paths
    session_id: str
    timestamp: datetime


class DocumentChunk(BaseModel):
    id: str
    content: str
    doc_id: str
    source_path: Optional[str] = None
    chunk_index: int
    metadata: dict = {}


class IngestionRequest(BaseModel):
    content: str
    doc_id: str
    title: str
    source_path: Optional[str] = None
    chunk_size: Optional[int] = 1024


class HealthResponse(BaseModel):
    status: str
    timestamp: datetime
    services: dict