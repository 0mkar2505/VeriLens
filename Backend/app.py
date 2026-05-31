from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import UnidentifiedImageError
from pydantic import BaseModel, Field

from Backend.auth.routes import router as auth_router
from Backend.db.mongodb import close_mongo_client
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


class TextRequest(BaseModel):
    text: str = Field(..., min_length=1)


@app.get("/health")
def health():
    return {
        "status": "ok",
        "device": str(DEVICE)
    }


@app.post("/image/predict")
async def image_predict(file: UploadFile = File(...)):
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=400,
            detail="Please upload a valid image file."
        )

    image_bytes = await file.read()

    try:
        result = predict_image(image_bytes)
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

    return result


@app.post("/text/predict")
def text_predict(payload: TextRequest):
    try:
        return predict_text(payload.text)
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
