import io
import json
from pathlib import Path

import torch
import torch.nn as nn
from PIL import Image
from torchvision import models, transforms


BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "model" / "verilens_model.pth"
CLASS_PATH = BASE_DIR / "model" / "class_names.json"

DISPLAY_NAMES = {
    "AI": "AI Generated",
    "Real": "Human Created"
}

DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

_model = None
_class_names = None


def load_class_names():
    if not CLASS_PATH.exists():
        raise FileNotFoundError(f"Class names file not found: {CLASS_PATH}")

    with CLASS_PATH.open("r") as f:
        class_names = json.load(f)

    if class_names != ["AI", "Real"]:
        raise ValueError(
            f"Expected binary classes ['AI', 'Real'], found {class_names}."
        )

    return class_names


def build_model(class_names):
    model = models.efficientnet_b0(weights=None)
    num_features = model.classifier[1].in_features

    model.classifier = nn.Sequential(
        nn.Dropout(0.3),
        nn.Linear(num_features, len(class_names))
    )

    if not MODEL_PATH.exists():
        raise FileNotFoundError(f"Model file not found: {MODEL_PATH}")

    model.load_state_dict(
        torch.load(
            MODEL_PATH,
            map_location=DEVICE
        )
    )

    model.to(DEVICE)
    model.eval()

    return model


def get_model():
    global _model, _class_names

    if _model is None or _class_names is None:
        _class_names = load_class_names()
        _model = build_model(_class_names)

    return _model, _class_names


def predict_image(image_bytes):
    model, class_names = get_model()

    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    image_tensor = transform(image).unsqueeze(0).to(DEVICE)

    with torch.no_grad():
        outputs = model(image_tensor)
        probabilities = torch.softmax(outputs, dim=1)[0]
        confidence, prediction = torch.max(probabilities, dim=0)

    raw_class = class_names[prediction.item()]
    display_class = DISPLAY_NAMES.get(raw_class, raw_class)

    return {
        "prediction": display_class,
        "class": raw_class,
        "confidence": round(confidence.item() * 100, 2),
        "probabilities": {
            DISPLAY_NAMES.get(class_name, class_name): round(
                probabilities[idx].item() * 100,
                2
            )
            for idx, class_name in enumerate(class_names)
        }
    }
