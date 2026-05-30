import os
import random
import shutil

# ==================================================
# CONFIGURATION
# ==================================================

# Source folders containing ALL images
SOURCE_REAL = r"PATH_TO_REAL_IMAGES"
SOURCE_DEEPFAKE = r"PATH_TO_DEEPFAKE_IMAGES"
SOURCE_AI = r"PATH_TO_AI_GENERATED_IMAGES"

# Output root folder
OUTPUT_ROOT = r"PATH_TO_DATASET_OUTPUT"

# Number of images to use from each class
TARGET_IMAGES_PER_CLASS = 2000

# Split ratios
TRAIN_RATIO = 0.8
VALIDATION_RATIO = 0.1
TEST_RATIO = 0.1

# Supported image formats
IMAGE_EXTENSIONS = (".jpg", ".jpeg", ".png")


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

    train_dir = os.path.join(
        OUTPUT_ROOT,
        "Train",
        f"{class_name}_Tr"
    )

    validation_dir = os.path.join(
        OUTPUT_ROOT,
        "Validation",
        f"{class_name}_V"
    )

    test_dir = os.path.join(
        OUTPUT_ROOT,
        "Test",
        f"{class_name}_Te"
    )

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

split_and_copy(
    SOURCE_REAL,
    "Real"
)

split_and_copy(
    SOURCE_DEEPFAKE,
    "Deepfake"
)

split_and_copy(
    SOURCE_AI,
    "AI"
)

print("\nDataset preparation completed successfully.")