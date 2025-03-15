# AI-Enhanced Service Platform (Backend)

This is the production‑grade backend of the AI‑Enhanced Service Platform built with FastAPI. It offers:
- AI endpoints for text generation and sentiment analysis.
- JWT-based authentication endpoints (register and login) to secure API usage.
- Production‑ready features: asynchronous processing, robust logging, rate limiting, and configuration management via environment variables.

## Setup Instructions

1. **Clone the repository and navigate to the backend directory:**
   ```bash
   git clone https://github.com/yourusername/ai-enhanced-service-platform.git
   cd ai-enhanced-service-platform/backend
2. **Configure Environment:**
    - Edit the .env file as needed.
3. **Install Dependencies**
    ```bash
   pip install -r requirements.txt
   ```
4. **Run Locally:**
    ```bash
   uvicorn app.main:app --reload
    ```

5. **Build Docker Image**
    ```bash
   docker build -t ai-platform-backend .
    ```
6. *Run via Docker Compose*
    - See root-level docker-compose.yml for orchestration with the frontend.
