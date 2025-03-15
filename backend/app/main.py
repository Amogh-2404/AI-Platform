import uvicorn
from fastapi import FastAPI
from app.core.config import settings
from app.core.logging_config import setup_logging
from app.api import endpoints, auth
from app.middlewares.logging import RequestLoggingMiddleware
from app.middlewares.rate_limiter import RateLimitMiddleware

# Setup logging using our configuration
setup_logging()

app = FastAPI(
    title=settings.APP_NAME,
    version="1.0.0",
    description="Production Grade AI-Enhanced Service Platform",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Add middlewares for request logging and rate limiting
app.add_middleware(RequestLoggingMiddleware)
app.add_middleware(RateLimitMiddleware)

# Include API routes
app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(endpoints.router, prefix="/api", tags=["AI"])

# Health Check endpoint for monitoring
@app.get("/health", tags=["Health"])
async def health_check():
    return {"status": "ok"}

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=settings.PORT, reload=True)