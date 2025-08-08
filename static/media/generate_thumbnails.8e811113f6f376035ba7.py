import os
from PIL import Image

# Directory setup
current_dir = os.getcwd()
thumb_dir = os.path.join(current_dir, "thumbnails")
os.makedirs(thumb_dir, exist_ok=True)

# Allowed image extensions
image_extensions = {".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tiff", ".webp"}

# Iterate over files in the current directory
for filename in os.listdir(current_dir):
    file_ext = os.path.splitext(filename)[1].lower()

    if file_ext in image_extensions and os.path.isfile(filename):
        try:
            img = Image.open(filename)
            aspect_ratio = img.width / img.height
            new_height = 100
            new_width = int(new_height * aspect_ratio)

            img = img.resize((new_width, new_height), Image.LANCZOS)

            output_path = os.path.join(thumb_dir, filename)
            img.save(output_path)
            print(f"Thumbnail created: {output_path}")

        except Exception as e:
            print(f"Error processing {filename}: {e}")

print("All thumbnails generated successfully.")
