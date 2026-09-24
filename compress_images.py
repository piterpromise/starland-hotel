import os
from PIL import Image

image_dir = "/home/xx-hellcat-xx/STARLAND HOTEL/Images"
output_dir = "/home/xx-hellcat-xx/STARLAND HOTEL/Images_compressed"

os.makedirs(output_dir, exist_ok=True)

# Dimensions maximales pour un affichage web optimal
MAX_SIZE = (1920, 1920)
QUALITY = 80

files = os.listdir(image_dir)
print(f"Compressing {len(files)} images...")

total_original_size = 0
total_compressed_size = 0

for filename in sorted(files):
    filepath = os.path.join(image_dir, filename)
    if not os.path.isfile(filepath):
        continue
    
    orig_size = os.path.getsize(filepath)
    total_original_size += orig_size
    
    try:
        with Image.open(filepath) as img:
            if img.mode in ("RGBA", "P"):
                img = img.convert("RGB")
            
            img.thumbnail(MAX_SIZE, Image.Resampling.LANCZOS)
            
            name, _ = os.path.splitext(filename)
            out_filename = f"{name}.webp"
            out_filepath = os.path.join(output_dir, out_filename)
            
            img.save(out_filepath, "WEBP", quality=QUALITY, optimize=True)
            
            comp_size = os.path.getsize(out_filepath)
            total_compressed_size += comp_size
            
            ratio = (1 - (comp_size / orig_size)) * 100
            print(f"Compressed {filename}: {orig_size / 1024 / 1024:.2f}MB -> {comp_size / 1024 / 1024:.2f}MB (-{ratio:.1f}%)")
    except Exception as e:
        print(f"Error processing {filename}: {e}")

print("\n--- DONE ---")
print(f"Total Original Size: {total_original_size / 1024 / 1024:.2f} MB")
print(f"Total Compressed Size: {total_compressed_size / 1024 / 1024:.2f} MB")
if total_original_size > 0:
    reduction = (1 - (total_compressed_size / total_original_size)) * 100
    print(f"Total Reduction: {reduction:.1f}%")

