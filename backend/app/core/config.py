from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    APP_NAME: str = "AI-Enhanced Service Platform"
    PORT: int = 8000
    LOG_LEVEL: str = "INFO"
    MAX_WORKERS: int = 4
    RATE_LIMIT: int = 100  # requests per minute per IP
    JWT_SECRET: str
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    class Config:
        env_file = ".env"

settings = Settings()