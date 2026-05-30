import os
import json
import torch
import torch.nn as nn
import torch.optim as optim

from torchvision import datasets, transforms, models
from torch.utils.data import DataLoader

# ==================================================
# CONFIG
# ==================================================

DATASET_ROOT = r"F:\VeriLens\Dataset"

TRAIN_DIR = os.path.join(DATASET_ROOT, "Train")
VAL_DIR = os.path.join(DATASET_ROOT, "Validation")

MODEL_PATH = r"F:\VeriLens\Backend\model\verilens_model.pth"
CLASS_PATH = r"F:\VeriLens\Backend\model\class_names.json"

EXPECTED_CLASSES = ["AI", "Real"]

BATCH_SIZE = 32
EPOCHS = 10
LEARNING_RATE = 1e-4

DEVICE = torch.device(
    "cuda" if torch.cuda.is_available() else "cpu"
)

print(f"\nUsing Device: {DEVICE}\n")

# ==================================================
# TRANSFORMS
# ==================================================

train_transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.RandomHorizontalFlip(),
    transforms.RandomRotation(10),
    transforms.ColorJitter(
        brightness=0.2,
        contrast=0.2
    ),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

val_transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

# ==================================================
# DATASETS
# ==================================================

train_dataset = datasets.ImageFolder(
    TRAIN_DIR,
    transform=train_transform
)

val_dataset = datasets.ImageFolder(
    VAL_DIR,
    transform=val_transform
)

train_loader = DataLoader(
    train_dataset,
    batch_size=BATCH_SIZE,
    shuffle=True,
    num_workers=0
)

val_loader = DataLoader(
    val_dataset,
    batch_size=BATCH_SIZE,
    shuffle=False,
    num_workers=0
)

# ==================================================
# SAVE CLASS NAMES
# ==================================================

class_names = train_dataset.classes

if class_names != EXPECTED_CLASSES:
    raise ValueError(
        f"Expected classes {EXPECTED_CLASSES}, found {class_names}. "
        "Use Dataset/Train/AI and Dataset/Train/Real for the binary image detector."
    )

print("Classes:")
for idx, cls in enumerate(class_names):
    print(f"{idx}: {cls}")

with open(CLASS_PATH, "w") as f:
    json.dump(class_names, f)

# ==================================================
# MODEL
# ==================================================

model = models.efficientnet_b0(
    weights=models.EfficientNet_B0_Weights.DEFAULT
)

num_features = model.classifier[1].in_features

model.classifier = nn.Sequential(
    nn.Dropout(0.3),
    nn.Linear(num_features, len(class_names))
)

model = model.to(DEVICE)

# ==================================================
# LOSS + OPTIMIZER
# ==================================================

criterion = nn.CrossEntropyLoss()

optimizer = optim.Adam(
    model.parameters(),
    lr=LEARNING_RATE
)

# ==================================================
# TRAINING LOOP
# ==================================================

best_accuracy = 0

for epoch in range(EPOCHS):

    model.train()

    running_loss = 0

    for images, labels in train_loader:

        images = images.to(DEVICE)
        labels = labels.to(DEVICE)

        optimizer.zero_grad()

        outputs = model(images)

        loss = criterion(outputs, labels)

        loss.backward()

        optimizer.step()

        running_loss += loss.item()

    train_loss = running_loss / len(train_loader)

    # -----------------------------
    # Validation
    # -----------------------------

    model.eval()

    correct = 0
    total = 0

    with torch.no_grad():

        for images, labels in val_loader:

            images = images.to(DEVICE)
            labels = labels.to(DEVICE)

            outputs = model(images)

            _, predicted = torch.max(outputs, 1)

            total += labels.size(0)

            correct += (predicted == labels).sum().item()

    accuracy = 100 * correct / total

    print(
        f"Epoch [{epoch+1}/{EPOCHS}] "
        f"Loss: {train_loss:.4f} "
        f"Val Acc: {accuracy:.2f}%"
    )

    if accuracy > best_accuracy:

        best_accuracy = accuracy

        torch.save(
            model.state_dict(),
            MODEL_PATH
        )

        print(
            f"Best model saved "
            f"({accuracy:.2f}%)"
        )

print("\nTraining Complete")
print(f"Best Validation Accuracy: {best_accuracy:.2f}%")
