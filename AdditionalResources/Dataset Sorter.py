import os
import random
import shutil

# ==================================================
# CONFIGURATION
# ==================================================

# Source folders containing ALL images
SOURCE_AI = r"F:\VeriLens\Dataset\Bulk\Super_GenAI_Dataset\Fake"
SOURCE_REAL = r"F:\VeriLens\Dataset\Bulk\Super_GenAI_Dataset\Real"

# Output root folder
OUTPUT_ROOT = r"F:\VeriLens\Dataset"

# Number of images to use from each class
TARGET_IMAGES_PER_CLASS = 4752

# Split ratios
TRAIN_RATIO = 0.8
VALIDATION_RATIO = 0.1
TEST_RATIO = 0.1

# Supported image formats
IMAGE_EXTENSIONS = (".jpg", ".jpeg", ".png")

CLASSES = {
    "AI": SOURCE_AI,
    "Real": SOURCE_REAL
}


# ==================================================
# DATASET SPLITTER
# ==================================================

def get_images(folder_path):
    return [
        f for f in os.listdir(folder_path)
        if f.lower().endswith(IMAGE_EXTENSIONS)
    ]


def create_directory(path):
    os.makedirs(path, exist_ok=True)


def split_and_copy(source_dir, class_name):

    images = get_images(source_dir)

    print(f"\nProcessing {class_name}")
    print(f"Found {len(images)} images")

    if len(images) < TARGET_IMAGES_PER_CLASS:
        raise ValueError(
            f"{class_name}: Found {len(images)} images "
            f"but need at least {TARGET_IMAGES_PER_CLASS}"
        )

    # Randomly select target number
    images = random.sample(images, TARGET_IMAGES_PER_CLASS)

    # Shuffle before splitting
    random.shuffle(images)

    train_count = int(TARGET_IMAGES_PER_CLASS * TRAIN_RATIO)
    validation_count = int(TARGET_IMAGES_PER_CLASS * VALIDATION_RATIO)

    train_images = images[:train_count]
    validation_images = images[
        train_count:train_count + validation_count
    ]
    test_images = images[
        train_count + validation_count:
    ]

    # Create output folders

    train_dir = os.path.join(OUTPUT_ROOT, "Train", class_name)
    validation_dir = os.path.join(OUTPUT_ROOT, "Validation", class_name)
    test_dir = os.path.join(OUTPUT_ROOT, "Test", class_name)

    create_directory(train_dir)
    create_directory(validation_dir)
    create_directory(test_dir)

    # Copy train images

    for image in train_images:
        shutil.copy2(
            os.path.join(source_dir, image),
            os.path.join(train_dir, image)
        )

    # Copy validation images

    for image in validation_images:
        shutil.copy2(
            os.path.join(source_dir, image),
            os.path.join(validation_dir, image)
        )

    # Copy test images

    for image in test_images:
        shutil.copy2(
            os.path.join(source_dir, image),
            os.path.join(test_dir, image)
        )

    print(
        f"Train: {len(train_images)} | "
        f"Validation: {len(validation_images)} | "
        f"Test: {len(test_images)}"
    )


# ==================================================
# EXECUTION
# ==================================================

for class_name, source_dir in CLASSES.items():
    split_and_copy(source_dir, class_name)

print("\nDataset preparation completed successfully.")
