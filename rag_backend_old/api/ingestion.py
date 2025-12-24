from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from schemas.schemas import IngestionRequest
from services.vector_store import QdrantService
from services.neon_db import NeonDBService
from utils.chunking import create_document_chunks
from config.settings import settings
import logging
import uuid

router = APIRouter()
logger = logging.getLogger(__name__)

# Initialize services
qdrant_service = QdrantService()
neon_service = NeonDBService()


@router.post("/ingest-textbook")
async def ingest_textbook():
    """
    Ingest the entire Physical AI textbook from the docs directory
    """
    try:
        import os
        import glob
        
        # Get the base path of the textbook (assuming running from rag_backend directory)
        textbook_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "docs")
        
        if not os.path.exists(textbook_path):
            raise HTTPException(status_code=404, detail=f"Textbook docs directory not found at {textbook_path}")
        
        # Find all markdown files in the textbook
        md_files = glob.glob(os.path.join(textbook_path, "**", "*.md"), recursive=True)
        
        total_chunks = 0
        for md_file in md_files:
            relative_path = os.path.relpath(md_file, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
            
            # Read the markdown file
            with open(md_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Create document ID from file path
            doc_id = str(uuid.uuid5(uuid.NAMESPACE_URL, md_file))
            
            # Extract title from the content (first H1 or filename)
            title = os.path.basename(md_file).replace('.md', '').replace('_', ' ').title()
            if content.startswith('# '):
                # Extract title from first H1
                first_line = content.split('\n')[0]
                if first_line.startswith('# '):
                    title = first_line[2:].strip()
            
            # Create chunks
            chunks = create_document_chunks(
                content=content,
                doc_id=doc_id,
                title=title,
                source_path=relative_path,
                chunk_size=settings.max_chunk_size
            )
            
            # Save document metadata to Neon DB
            await neon_service.save_document(
                doc_id=doc_id,
                title=title,
                content=content,
                source_path=relative_path
            )
            
            # Prepare chunks for Qdrant
            qdrant_chunks = []
            for chunk in chunks:
                qdrant_chunk = {
                    'id': chunk.id,
                    'content': chunk.content,
                    'doc_id': chunk.doc_id,
                    'source_path': chunk.source_path,
                    'chunk_index': chunk.chunk_index,
                    'metadata': chunk.metadata,
                    'title': chunk.metadata.get('title', title)
                }
                qdrant_chunks.append(qdrant_chunk)
            
            # Upsert chunks to Qdrant
            success = await qdrant_service.upsert_chunks(qdrant_chunks)
            if success:
                total_chunks += len(qdrant_chunks)
                logger.info(f"Successfully ingested {len(qdrant_chunks)} chunks from {relative_path}")
            else:
                logger.error(f"Failed to ingest chunks from {relative_path}")
        
        return {
            "message": f"Successfully ingested textbook with {len(md_files)} files and {total_chunks} chunks",
            "files_processed": len(md_files),
            "chunks_created": total_chunks
        }
        
    except Exception as e:
        logger.error(f"Error ingesting textbook: {e}")
        raise HTTPException(status_code=500, detail=f"Error ingesting textbook: {str(e)}")


@router.post("/ingest-document")
async def ingest_document(request: IngestionRequest):
    """
    Ingest a single document
    """
    try:
        # Create chunks from the provided content
        chunks = create_document_chunks(
            content=request.content,
            doc_id=request.doc_id,
            title=request.title,
            source_path=request.source_path,
            chunk_size=request.chunk_size
        )
        
        # Save document metadata to Neon DB
        await neon_service.save_document(
            doc_id=request.doc_id,
            title=request.title,
            content=request.content,
            source_path=request.source_path
        )
        
        # Prepare chunks for Qdrant
        qdrant_chunks = []
        for chunk in chunks:
            qdrant_chunk = {
                'id': chunk.id,
                'content': chunk.content,
                'doc_id': chunk.doc_id,
                'source_path': chunk.source_path,
                'chunk_index': chunk.chunk_index,
                'metadata': chunk.metadata,
                'title': chunk.metadata.get('title', request.title)
            }
            qdrant_chunks.append(qdrant_chunk)
        
        # Upsert chunks to Qdrant
        success = await qdrant_service.upsert_chunks(qdrant_chunks)
        
        if success:
            return {
                "message": f"Successfully ingested document with {len(qdrant_chunks)} chunks",
                "doc_id": request.doc_id,
                "chunks_created": len(qdrant_chunks)
            }
        else:
            raise HTTPException(status_code=500, detail="Failed to ingest document into vector store")
            
    except Exception as e:
        logger.error(f"Error ingesting document: {e}")
        raise HTTPException(status_code=500, detail=f"Error ingesting document: {str(e)}")


@router.delete("/delete-document/{doc_id}")
async def delete_document(doc_id: str):
    """
    Delete a document and its chunks
    """
    try:
        # Delete from Qdrant
        qdrant_success = await qdrant_service.delete_by_doc_id(doc_id)
        
        # In a real implementation, we might also want to delete from Neon DB
        # For now, we'll just log that we would delete from Neon DB
        
        if qdrant_success:
            return {"message": f"Successfully deleted document {doc_id}", "doc_id": doc_id}
        else:
            raise HTTPException(status_code=500, detail="Failed to delete document from vector store")
            
    except Exception as e:
        logger.error(f"Error deleting document: {e}")
        raise HTTPException(status_code=500, detail=f"Error deleting document: {str(e)}")


@router.get("/status")
async def ingestion_status():
    """
    Get ingestion status
    """
    try:
        total_points = await qdrant_service.get_total_points()
        return {
            "vector_store_points": total_points,
            "message": f"Vector store contains {total_points} chunks"
        }
    except Exception as e:
        logger.error(f"Error getting ingestion status: {e}")
        raise HTTPException(status_code=500, detail=f"Error getting status: {str(e)}")