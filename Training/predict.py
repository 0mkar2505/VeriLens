import json
import argparse
import torch
import torch.nn as nn

from PIL import Image
from torchvision import transforms, models

# ==========================================
# CONFIG
# ==========================================

IMAGE_PATH = r"C:\Users\Admin\Pictures\Screenshots\Mi Casa.png"

MODEL_PATH = r"F:\VeriLens\Backend\model\verilens_model.pth"
CLASS_PATH = r"F:\VeriLens\Backend\model\class_names.json"

DISPLAY_NAMES = {
    "AI": "AI Generated",
    "Real": "Human Created"
}

DEVICE = torch.device(
    "cuda" if torch.cuda.is_available() else "cpu"
)

# ==========================================
# LOAD CLASS NAMES
# ==========================================

with open(CLASS_PATH, "r") as f:
    class_names = json.load(f)

if class_names != ["AI", "Real"]:
    raise ValueError(
        f"Expected binary classes ['AI', 'Real'], found {class_names}."
    )

# ==========================================
# TRANSFORMS
# ==========================================

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

# ==========================================
# LOAD MODEL
# ==========================================

model = models.efficientnet_b0(weights=None)

num_features = model.classifier[1].in_features

model.classifier = nn.Sequential(
    nn.Dropout(0.3),
    nn.Linear(num_features, len(class_names))
)

model.load_state_dict(
    torch.load(
        MODEL_PATH,
        map_location=DEVICE
    )
)

model.to(DEVICE)
model.eval()

# ==========================================
# LOAD IMAGE
# ==========================================

parser = argparse.ArgumentParser(
    description="Predict whether an image is AI generated or human created."
)

parser.add_argument(
    "--image",
    default=IMAGE_PATH,
    help="Path to the image to verify."
)

args = parser.parse_args()

image = Image.open(args.image).convert("RGB")

image_tensor = transform(image).unsqueeze(0)

image_tensor = image_tensor.to(DEVICE)

# ==========================================
# PREDICT
# ==========================================

with torch.no_grad():

    outputs = model(image_tensor)

    probabilities = torch.softmax(outputs, dim=1)

    confidence, prediction = torch.max(
        probabilities,
        dim=1
    )

predicted_class = class_names[
    prediction.item()
]

display_class = DISPLAY_NAMES.get(predicted_class, predicted_class)

print("\n========================")
print(f"Prediction: {display_class}")
print(f"Confidence: {confidence.item()*100:.2f}%")
print("========================\n")

for idx, cls in enumerate(class_names):
    print(
        f"{DISPLAY_NAMES.get(cls, cls)}: "
        f"{probabilities[0][idx].item()*100:.2f}%"
    )
