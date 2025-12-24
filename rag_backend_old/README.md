# Physical AI & Humanoid Robotics RAG Backend

This is the backend service for the Physical AI & Humanoid Robotics textbook RAG chatbot.

## Architecture

- **Chat Generation**: OpenRouter API (Qwen models)
- **Embeddings**: Qwen-compatible embedding model via OpenRouter
- **Backend**: FastAPI
- **Vector DB**: Qdrant Cloud
- **Metadata DB**: Neon Serverless Postgres
- **Frontend Embed**: JavaScript widget

## Features

1. RAG-based question answering from the FULL book
2. "Selected Text Mode": If user highlights/selects text, chatbot answers ONLY from that selected text
3. Normal Mode: Answer from the entire book content using RAG
4. Strict grounding: If answer is not in the provided context, says "This information is not available in the book."

## Setup

### Prerequisites

- Python 3.8+
- Qdrant Cloud account
- Neon Postgres account
- OpenRouter API key

### Installation

1. Install dependencies:
```bash
cd rag_backend
pip install -r requirements.txt
```

2. Copy the environment file and fill in your credentials:
```bash
cp .env.example .env
# Edit .env with your actual credentials
```

### Environment Variables

- `OPENROUTER_API_KEY`: Your OpenRouter API key
- `QDRANT_URL`: Your Qdrant cluster URL
- `QDRANT_API_KEY`: Your Qdrant API key (optional if using local Qdrant)
- `NEON_DB_URL`: Your Neon Postgres connection string

## Running the Backend

1. Start the backend server:
```bash
cd rag_backend
uvicorn main:app --reload --port 8000
```

2. Ingest the textbook content:
```bash
curl -X POST http://localhost:8000/api/v1/ingestion/ingest-textbook
```

3. Check the ingestion status:
```bash
curl http://localhost:8000/api/v1/ingestion/status
```

## API Endpoints

### Chat
- `POST /api/v1/chat/query` - Chat with the textbook assistant

Request body:
```json
{
  "query": "Your question here",
  "session_id": "optional session ID",
  "selected_text": "optional selected text for selected-text mode",
  "max_tokens": 1024,
  "temperature": 0.7
}
```

### Ingestion
- `POST /api/v1/ingestion/ingest-textbook` - Ingest the entire textbook
- `GET /api/v1/ingestion/status` - Get ingestion status

### Health
- `GET /api/v1/health/status` - Health check

## Frontend Integration

The chatbot is designed to be embedded in the Docusaurus textbook. The JavaScript widget is automatically loaded via the Docusaurus config.

## Development

Run with auto-reload for development:
```bash
uvicorn main:app --reload --port 8000
```

Run tests:
```bash
python -m pytest
```