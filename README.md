# AI-Enhanced Service Platform

This is a full‑stack, production‑grade AI service platform built as a comprehensive portfolio project. It consists of:

- **Backend:**  
  A FastAPI application that provides:
  - **AI Endpoints:**  
    - `/api/generate` for text generation using GPT‑2.
    - `/api/sentiment` for sentiment analysis.
  - **Authentication:**  
    JWT‑based user registration and login endpoints under `/auth`.
  - **Production‑Ready Features:**  
    Asynchronous processing, robust logging, rate limiting middleware, and health checks.
  - **Containerization:**  
    Dockerfile and configuration for deployment with Gunicorn & Uvicorn.

- **Frontend:**  
  A creative React application built with Vite and Tailwind CSS that:
  - Provides a modern, responsive UI.
  - Offers pages for text generation, sentiment analysis, and authentication (login/register).
  - Integrates with the backend via Axios and environment‑based API configuration.

- **Deployment:**  
  A Docker Compose setup to orchestrate both the backend and frontend for easy local or cloud deployment.

## Getting Started

### Prerequisites
- Docker and Docker Compose installed on your machine.

### Running Locally with Docker Compose

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/ai-enhanced-service-platform.git
   cd ai-enhanced-service-platform
   ```
2. **Build and Run**
    ```bash
   docker-compose up --build
    ```
   - The backend will run on http://localhost:8000 and the frontend on http://localhost:3000.

## Local Development
### Backend
1. **Navigate to _backend/_ folder.**
2. **Create a virtual environment and install dependencies**
  ```bash
  python -m venv venv 
  source venv/bin/activate
  pip install -r requirements.txt
  ```
3. **Run the app**
  ```bash
  uvicorn app.main:app --reload
   ```

### Frontend
1. **Navigate to _frontend/_ folder.**
2. **Install dependencies**
  ```bash
  npm install
  ```
3. **Start the development server**
  ```bash
  npm run dev
   ```
## Project Highlights
1. **Robust Full‑Stack Architecture**:
The project is organized with a clear separation between backend and frontend code, making it scalable and maintainable.
2. **Production‑Grade Backend**:
Implements asynchronous processing, logging, rate limiting, and JWT‑based authentication.
3. **Modern Frontend**:
A creative React app using Tailwind CSS with a smooth user experience and integration with AI endpoints.
4. **Containerization & CI/CD Ready**:
Dockerfiles and Docker Compose configurations are provided for easy deployment and integration into a CI/CD pipeline.


## Happy coding 😉