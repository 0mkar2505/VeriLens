from datetime import datetime, timedelta, timezone
import hashlib

import bcrypt
from jose import JWTError, jwt

from Backend.core.config import settings


def normalize_password(password):
    return hashlib.sha256(password.encode("utf-8")).hexdigest().encode("utf-8")


def hash_password(password):
    return bcrypt.hashpw(
        normalize_password(password),
        bcrypt.gensalt()
    ).decode("utf-8")


def verify_password(plain_password, password_hash):
    return bcrypt.checkpw(
        normalize_password(plain_password),
        password_hash.encode("utf-8")
    )


def create_access_token(subject):
    expires_at = datetime.now(timezone.utc) + timedelta(
        minutes=settings.access_token_expire_minutes
    )

    payload = {
        "sub": str(subject),
        "exp": expires_at
    }

    return jwt.encode(
        payload,
        settings.jwt_secret,
        algorithm=settings.jwt_algorithm
    )


def decode_access_token(token):
    try:
        return jwt.decode(
            token,
            settings.jwt_secret,
            algorithms=[settings.jwt_algorithm]
        )
    except JWTError:
        return None
