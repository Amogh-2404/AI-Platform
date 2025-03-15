import time
from collections import defaultdict
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import JSONResponse
from app.core.config import settings

class RateLimitMiddleware(BaseHTTPMiddleware):
    def __init__(self, app):
        super().__init__(app)
        self.requests = defaultdict(list)

    async def dispatch(self, request: Request, call_next):
        client_ip = request.client.host
        current_time = time.time()
        window = 60  # 60-second window

        # Clean up old requests
        self.requests[client_ip] = [t for t in self.requests[client_ip] if t > current_time - window]

        if len(self.requests[client_ip]) >= settings.RATE_LIMIT:
            return JSONResponse({"detail": "Rate limit exceeded"}, status_code=429)

        self.requests[client_ip].append(current_time)
        response = await call_next(request)
        return response