from pathlib import Path
from PIL import Image

# ======
# Config
# ======

MAX_WIDTH = 1000
MAX_HEIGHT = 1000

JPEG_QUALITY = 90
JPEG_OPTIMIZE = True
JPEG_PROGRESSIVE = True

OUTPUT_DIR = "compressed"

SUPPORTED_EXTENSIONS = {
    ".png",
    ".jpg",
    ".jpeg",
    ".bmp",
    ".tiff",
    ".tif",
    ".webp",
    ".gif",
}

def resize_image(img: Image.Image) -> Image.Image:
    width, height = img.size

    if width <= MAX_WIDTH and height <= MAX_HEIGHT:
        return img

    scale = min(MAX_WIDTH / width, MAX_HEIGHT / height)

    new_width = int(width * scale)
    new_height = int(height * scale)

    return img.resize((new_width, new_height), Image.LANCZOS)


def convert_image(input_path: Path, output_dir: Path):
    try:
        with Image.open(input_path) as img:

            if img.mode in ("RGBA", "LA", "P"):
                background = Image.new("RGB", img.size, (255, 255, 255))
                if img.mode == "P":
                    img = img.convert("RGBA")
                background.paste(img, mask=img.split()[-1] if "A" in img.mode else None)
                img = background
            else:
                img = img.convert("RGB")

            img = resize_image(img)

            output_path = output_dir / f"{input_path.stem}.jpg"

            img.save(
                output_path,
                "JPEG",
                quality=JPEG_QUALITY,
                optimize=JPEG_OPTIMIZE,
                progressive=JPEG_PROGRESSIVE,
            )

            print(f"Converted: {input_path.name} -> {output_path}")

    except Exception as e:
        print(f"Failed: {input_path.name} ({e})")


def main():
    current_dir = Path(".")
    output_dir = current_dir / OUTPUT_DIR
    output_dir.mkdir(exist_ok=True)

    image_files = [
        p for p in current_dir.iterdir()
        if p.is_file()
        and p.suffix.lower() in SUPPORTED_EXTENSIONS
    ]

    if not image_files:
        print("No image files found.")
        return

    for image_path in image_files:
        convert_image(image_path, output_dir)

    print("Done.")


if __name__ == "__main__":
    main()