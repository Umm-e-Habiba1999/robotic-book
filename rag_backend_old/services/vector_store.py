from qdrant_client import AsyncQdrantClient
from qdrant_client.http.models import (
    PointStruct, 
    VectorParams, 
    Distance,
    PayloadSchemaType,
    FieldCondition,
    MatchValue
)
from typing import List, Dict, Any, Optional
import logging
from config.settings import settings
from utils.chunking import create_document_chunks
from services.embeddings import get_qwen_embeddings
import uuid

logger = logging.getLogger(__name__)


class QdrantService:
    def __init__(self):
        self.client = None
    
    async def init_client(self):
        """Initialize Qdrant client"""
        if settings.qdrant_api_key:
            self.client = AsyncQdrantClient(
                url=settings.qdrant_url,
                api_key=settings.qdrant_api_key,
                prefer_grpc=False
            )
        else:
            self.client = AsyncQdrantClient(url=settings.qdrant_url)
        
        # Initialize the collection
        await self._init_collection()
    
    async def _init_collection(self):
        """Initialize the Qdrant collection for textbook chunks"""
        try:
            # Check if collection exists
            collections = await self.client.get_collections()
            collection_exists = any(col.name == "textbook_chunks" for col in collections.collections)

            if not collection_exists:
                # Create collection with embedding dimensions from settings
                await self.client.create_collection(
                    collection_name="textbook_chunks",
                    vectors_config=VectorParams(size=settings.embedding_dimensions, distance=Distance.COSINE),
                )
                
                # Create payload indexes for faster filtering
                await self.client.create_payload_index(
                    collection_name="textbook_chunks",
                    field_name="doc_id",
                    field_schema=PayloadSchemaType.KEYWORD
                )
                
                await self.client.create_payload_index(
                    collection_name="textbook_chunks",
                    field_name="source_path",
                    field_schema=PayloadSchemaType.KEYWORD
                )
                
                logger.info("Qdrant collection 'textbook_chunks' created successfully")
            else:
                logger.info("Qdrant collection 'textbook_chunks' already exists")
        except Exception as e:
            logger.error(f"Failed to initialize Qdrant collection: {e}")
            raise
    
    async def upsert_chunks(self, chunks: List[Dict[str, Any]]) -> bool:
        """
        Upsert document chunks to Qdrant
        Each chunk should have: id, content, doc_id, source_path, metadata
        """
        try:
            # Get embeddings for all chunk contents
            texts = [chunk['content'] for chunk in chunks]
            embeddings = await get_qwen_embeddings(texts)
            
            # Prepare points for upsert
            points = []
            for i, chunk in enumerate(chunks):
                point = PointStruct(
                    id=uuid.uuid4().hex,  # Generate unique ID for the point
                    vector=embeddings[i],
                    payload={
                        "doc_id": chunk.get('doc_id'),
                        "content": chunk.get('content'),
                        "source_path": chunk.get('source_path'),
                        "chunk_index": chunk.get('chunk_index', 0),
                        "metadata": chunk.get('metadata', {}),
                        "title": chunk.get('title', '')
                    }
                )
                points.append(point)
            
            # Upsert points to collection
            await self.client.upsert(
                collection_name="textbook_chunks",
                points=points,
                wait=True
            )
            
            logger.info(f"Successfully upserted {len(points)} chunks to Qdrant")
            return True
        except Exception as e:
            logger.error(f"Error upserting chunks to Qdrant: {e}")
            return False
    
    async def search_similar(self, query: str, top_k: int = 5, doc_ids: Optional[List[str]] = None) -> List[Dict[str, Any]]:
        """
        Search for similar chunks to the query
        """
        try:
            # Get embedding for the query
            query_embedding = await get_qwen_embeddings([query])
            query_vector = query_embedding[0]
            
            # Prepare filters if doc_ids are specified
            filters = None
            if doc_ids:
                filters = FieldCondition(
                    key="doc_id",
                    match=MatchValue(value=doc_ids[0] if len(doc_ids) == 1 else {"any": doc_ids})
                )
            
            # Search in Qdrant
            search_results = await self.client.search(
                collection_name="textbook_chunks",
                query_vector=query_vector,
                limit=top_k,
                query_filter=filters,
                with_payload=True
            )
            
            # Format results
            results = []
            for hit in search_results:
                result = {
                    "id": hit.id,
                    "score": hit.score,
                    "content": hit.payload.get("content"),
                    "doc_id": hit.payload.get("doc_id"),
                    "source_path": hit.payload.get("source_path"),
                    "metadata": hit.payload.get("metadata", {}),
                    "title": hit.payload.get("title", "")
                }
                results.append(result)
            
            logger.info(f"Found {len(results)} similar chunks for query")
            return results
        except Exception as e:
            logger.error(f"Error searching in Qdrant: {e}")
            return []
    
    async def delete_by_doc_id(self, doc_id: str) -> bool:
        """
        Delete all chunks associated with a document ID
        """
        try:
            # Create filter for the specific doc_id
            filter_condition = FieldCondition(
                key="doc_id",
                match=MatchValue(value=doc_id)
            )
            
            # Delete points matching the filter
            await self.client.delete(
                collection_name="textbook_chunks",
                points_selector=filter_condition
            )
            
            logger.info(f"Deleted all chunks for doc_id: {doc_id}")
            return True
        except Exception as e:
            logger.error(f"Error deleting chunks from Qdrant: {e}")
            return False
    
    async def get_total_points(self) -> int:
        """
        Get total number of points in the collection
        """
        try:
            collection_info = await self.client.get_collection("textbook_chunks")
            return collection_info.points_count
        except Exception as e:
            logger.error(f"Error getting total points count: {e}")
            return 0