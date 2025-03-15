import logging
from datetime import datetime, timedelta
from typing import Optional, Dict
from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from app.core.config import settings
from app.core.security import verify_password, get_password_hash, create_access_token, decode_access_token

logger = logging.getLogger(__name__)
router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

# For demonstration purposes, using an in-memory "database"
fake_users_db: Dict[str, Dict] = {}

class User(BaseModel):
    username: str
    full_name: Optional[str] = None
    email: Optional[str] = None

class UserInDB(User):
    hashed_password: str

class UserCreate(BaseModel):
    username: str
    password: str
    full_name: Optional[str] = None
    email: Optional[str] = None

class Token(BaseModel):
    access_token: str
    token_type: str

def get_user(username: str) -> Optional[UserInDB]:
    user = fake_users_db.get(username)
    if user:
        return UserInDB(**user)
    return None

@router.post("/register", summary="Register a new user", response_model=User)
def register(user: UserCreate):
    if user.username in fake_users_db:
        raise HTTPException(status_code=400, detail="Username already registered")
    hashed_password = get_password_hash(user.password)
    fake_users_db[user.username] = {
        "username": user.username,
        "full_name": user.full_name,
        "email": user.email,
        "hashed_password": hashed_password,
    }
    logger.info(f"User registered: {user.username}")
    return User(**fake_users_db[user.username])

@router.post("/login", summary="Login and get a JWT token", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = get_user(form_data.username)
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Incorrect username or password",
                            headers={"WWW-Authenticate": "Bearer"})
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username},
        expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

def get_current_user(token: str = Depends(oauth2_scheme)) -> User:
    try:
        payload = decode_access_token(token)
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid authentication credentials")
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token") from e
    user = get_user(username)
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")
    return User(**user.dict())