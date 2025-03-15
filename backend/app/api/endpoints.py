import asyncio
import logging
from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from concurrent.futures import ThreadPoolExecutor
from transformers import pipeline
from app.core.config import settings

logger = logging.getLogger(__name__)
router = APIRouter()

# Create a thread pool for CPU-bound tasks
executor = ThreadPoolExecutor(max_workers=settings.MAX_WORKERS)

from fastapi import Depends
from app.api.auth import oauth2_scheme

def get_current_user_dep(token: str = Depends(oauth2_scheme)):
    from app.api.auth import get_current_user
    return get_current_user(token)

# Request models
class TextRequest(BaseModel):
    text: str
    max_length: int = 50

class SentimentRequest(BaseModel):
    text: str

# Global variables for AI pipelines (initialized on startup)
generator = None
sentiment_analyzer = None

@router.on_event("startup")
async def load_models():
    global generator, sentiment_analyzer
    logger.info("Loading AI models asynchronously...")
    loop = asyncio.get_event_loop()
    generator = await loop.run_in_executor(
        executor, lambda: pipeline("text-generation", model="gpt2")
    )
    sentiment_analyzer = await loop.run_in_executor(
        executor, lambda: pipeline("sentiment-analysis")
    )
    logger.info("AI models loaded successfully.")

@router.post("/generate", dependencies=[Depends(get_current_user_dep)], summary="Generate Text")
async def generate_text(request: TextRequest):
    if not generator:
        logger.error("Text generation model not loaded.")
        raise HTTPException(status_code=503, detail="Model not loaded yet.")
    try:
        loop = asyncio.get_event_loop()
        result = await loop.run_in_executor(
            executor, lambda: generator(request.text, max_length=request.max_length)
        )
        generated_text = result[0]["generated_text"]
        return {"generated_text": generated_text}
    except Exception as e:
        logger.error(f"Error during text generation: {e}")
        raise HTTPException(status_code=500, detail="Error during text generation")

@router.post("/sentiment", dependencies=[Depends(get_current_user_dep)], summary="Analyze Sentiment")
async def analyze_sentiment(request: SentimentRequest):
    if not sentiment_analyzer:
        logger.error("Sentiment analysis model not loaded.")
        raise HTTPException(status_code=503, detail="Model not loaded yet.")
    try:
        loop = asyncio.get_event_loop()
        result = await loop.run_in_executor(
            executor, lambda: sentiment_analyzer(request.text)
        )
        return {"sentiment": result}
    except Exception as e:
        logger.error(f"Error during sentiment analysis: {e}")
        raise HTTPException(status_code=500, detail="Error during sentiment analysis")
