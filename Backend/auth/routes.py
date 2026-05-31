from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm

from Backend.auth.dependencies import get_current_user
from Backend.auth.schemas import (
    LoginRequest,
    RegisterRequest,
    TokenResponse,
    UserPublic
)
from Backend.core.security import (
    create_access_token,
    hash_password,
    verify_password
)
from Backend.db.mongodb import create_user_indexes, get_database


router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)


def serialize_user(user):
    return UserPublic(
        id=str(user["_id"]),
        email=user["email"],
        role=user.get("role", "user"),
        subscription=user.get("subscription", "free"),
        is_active=user.get("is_active", True),
        created_at=user["created_at"]
    )


def build_token_response(user):
    return TokenResponse(
        access_token=create_access_token(user["_id"]),
        user=serialize_user(user)
    )


@router.post("/register", response_model=TokenResponse)
async def register(payload: RegisterRequest):
    db = get_database()
    await create_user_indexes()

    email = payload.email.lower()
    existing_user = await db.users.find_one({"email": email})

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An account with this email already exists."
        )

    user_document = {
        "email": email,
        "password_hash": hash_password(payload.password),
        "role": "user",
        "subscription": "free",
        "is_active": True,
        "created_at": datetime.now(timezone.utc)
    }

    result = await db.users.insert_one(user_document)
    user_document["_id"] = result.inserted_id

    return build_token_response(user_document)


@router.post("/login", response_model=TokenResponse)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    db = get_database()
    email = form_data.username.lower()
    user = await db.users.find_one({"email": email})

    if not user or not verify_password(
        form_data.password,
        user.get("password_hash", "")
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password."
        )

    if not user.get("is_active", True):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User account is disabled."
        )

    return build_token_response(user)


@router.get("/me", response_model=UserPublic)
async def me(current_user=Depends(get_current_user)):
    return serialize_user(current_user)
