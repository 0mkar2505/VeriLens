from datetime import datetime

from fastapi import FastAPI, File, HTTPException, UploadFile, Depends
from fastapi.middleware.cors import CORSMiddleware
from PIL import UnidentifiedImageError
from pydantic import BaseModel, Field

from Backend.auth.routes import router as auth_router
from Backend.auth.dependencies import get_current_user
from Backend.dashboard.routes import router as dashboard_router
from Backend.db.mongodb import close_mongo_client, get_database
from Backend.history.routes import router as history_router
from Backend.image_detector import DEVICE, get_model, predict_image
from Backend.text_detector import predict_text

app = FastAPI(
    title="VeriLens API",
    description="AI Content Verification Platform backend.",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(auth_router)
app.include_router(history_router)
app.include_router(dashboard_router)

class TextRequest(BaseModel):
    text: str = Field(..., min_length=1)

@app.get("/health")
def health():
    return {
        "status": "ok",
        "device": str(DEVICE)
    }

@app.post("/image/predict")
async def image_predict(
    file: UploadFile = File(...),
    current_user=Depends(get_current_user)
):
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=400,
            detail="Please upload a valid image file."
        )

    image_bytes = await file.read()

    try:
        result = predict_image(image_bytes)

        db = get_database()

        await db.analysis_logs.insert_one({
            "user_id": str(current_user["_id"]),
            "analysis_type": "image",
            "prediction": result["prediction"],
            "confidence": result["confidence"],
            "probabilities": result["probabilities"],
            "metadata": {
                "filename": file.filename
            },
            "created_at": datetime.utcnow()
        })

        return result

    except (UnidentifiedImageError, OSError):
        raise HTTPException(
            status_code=400,
            detail="The uploaded file could not be read as an image."
        )

    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=str(exc)
        )

@app.post("/text/predict")
async def text_predict(
    payload: TextRequest,
    current_user=Depends(get_current_user)
):
    try:
        result = predict_text(payload.text)

        db = get_database()

        await db.analysis_logs.insert_one({
            "user_id": str(current_user["_id"]),
            "analysis_type": "text",
            "prediction": result["prediction"],
            "metadata": {
                "text_length": len(payload.text)
            },
            "result": result,
            "created_at": datetime.utcnow()
        })

        return result

    except ValueError as exc:
        raise HTTPException(
            status_code=400,
            detail=str(exc)
        )

@app.on_event("startup")
def warm_up_model():
    get_model()

@app.on_event("shutdown")
def shutdown_database():
    close_mongo_client()
