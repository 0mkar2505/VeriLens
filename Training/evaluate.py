import os
import json
import torch
import torch.nn as nn

from torchvision import datasets, transforms, models
from torch.utils.data import DataLoader

from sklearn.metrics import (
    classification_report,
    confusion_matrix,
    accuracy_score
)

# ==================================================
# PATHS
# ==================================================

DATASET_ROOT = r"F:\VeriLens\Dataset\Test"

MODEL_PATH = r"F:\VeriLens\Backend\model\verilens_model.pth"
CLASS_PATH = r"F:\VeriLens\Backend\model\class_names.json"

EXPECTED_CLASSES = ["AI", "Real"]

DEVICE = torch.device(
    "cuda" if torch.cuda.is_available() else "cpu"
)

# ==================================================
# TRANSFORMS
# ==================================================

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

# ==================================================
# DATASET
# ==================================================

test_dataset = datasets.ImageFolder(
    DATASET_ROOT,
    transform=transform
)

test_loader = DataLoader(
    test_dataset,
    batch_size=32,
    shuffle=False,
    num_workers=0
)

# ==================================================
# LOAD CLASS NAMES
# ==================================================

with open(CLASS_PATH, "r") as f:
    class_names = json.load(f)

if class_names != EXPECTED_CLASSES:
    raise ValueError(
        f"Expected binary classes {EXPECTED_CLASSES}, found {class_names}."
    )

# ==================================================
# LOAD MODEL
# ==================================================

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

# ==================================================
# EVALUATION
# ==================================================

all_labels = []
all_predictions = []

with torch.no_grad():

    for images, labels in test_loader:

        images = images.to(DEVICE)

        outputs = model(images)

        _, predicted = torch.max(outputs, 1)

        all_labels.extend(labels.numpy())
        all_predictions.extend(predicted.cpu().numpy())

# ==================================================
# RESULTS
# ==================================================

accuracy = accuracy_score(
    all_labels,
    all_predictions
)

print("\n====================")
print(f"Accuracy: {accuracy * 100:.2f}%")
print("====================\n")

print("Classification Report:\n")

print(
    classification_report(
        all_labels,
        all_predictions,
        labels=list(range(len(class_names))),
        target_names=class_names
    )
)

print("\nBinary Confusion Matrix:")
print("Rows = Actual | Columns = Predicted")
print(class_names)
print()

print(
    confusion_matrix(
        all_labels,
        all_predictions,
        labels=list(range(len(class_names)))
    )
)
