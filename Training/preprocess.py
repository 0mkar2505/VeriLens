import os
from PIL import Image

DATASET_ROOT = r"F:\VeriLens\Dataset"

folders = [
    "Train/AI",
    "Train/Real",

    "Validation/AI",
    "Validation/Real",

    "Test/AI",
    "Test/Real"
]

total_images = 0
corrupted_images = []

print("\n=== DATASET VALIDATION ===\n")

for folder in folders:

    folder_path = os.path.join(DATASET_ROOT, folder)

    count = 0

    if not os.path.isdir(folder_path):
        print(f"{folder}: missing")
        continue

    for file in os.listdir(folder_path):

        if not file.lower().endswith((".jpg", ".jpeg", ".png")):
            continue

        path = os.path.join(folder_path, file)

        try:
            img = Image.open(path)
            img.verify()

            count += 1
            total_images += 1

        except Exception:
            corrupted_images.append(path)

    print(f"{folder}: {count}")

print("\n========================")
print(f"Total Images: {total_images}")
print(f"Corrupted Images: {len(corrupted_images)}")
print("========================")

if corrupted_images:
    print("\nCorrupted Files:")
    for img in corrupted_images:
        print(img)
