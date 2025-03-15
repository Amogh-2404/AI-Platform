import logging
import uuid
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request

logger = logging.getLogger("request_logger")

class RequestLoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        request_id = str(uuid.uuid4())
        request.state.request_id = request_id
        logger.info(f"Request {request_id}: {request.method} {request.url}")
        response = await call_next(request)
        logger.info(f"Request {request_id} completed with status {response.status_code}")
        return response