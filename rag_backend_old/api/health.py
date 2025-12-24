from fastapi import APIRouter, HTTPException, Depends
from datetime import datetime
from schemas.schemas import HealthResponse
from database.db import get_qdrant_client, get_neon_connection

router = APIRouter()


@router.get("/", response_model=HealthResponse)
async def health_check():
    """Health check endpoint"""
    timestamp = datetime.now()
    
    # Check services
    services = {
        "qdrant": False,
        "neon_db": False,
        "api": True  # This endpoint is working
    }
    
    # Test Qdrant connection
    try:
        client = await get_qdrant_client()
        await client.get_collections()
        services["qdrant"] = True
    except Exception:
        services["qdrant"] = False
    
    # Test Neon DB connection
    try:
        conn = await get_neon_connection()
        await conn.fetchval("SELECT 1")
        await conn.close()
        services["neon_db"] = True
    except Exception:
        services["neon_db"] = False
    
    status = "healthy" if all(services.values()) else "degraded"
    
    return HealthResponse(
        status=status,
        timestamp=timestamp,
        services=services
    )


@router.get("/ready")
async def readiness_check():
    """Readiness check endpoint"""
    # For now, just return that we're ready
    # In production, this might check more specific conditions
    return {"status": "ready", "timestamp": datetime.now()}