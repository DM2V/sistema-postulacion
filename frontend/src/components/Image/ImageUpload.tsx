import React, { useState } from 'react';
import EasyCrop from './EasyCrop'; // Adjust the path accordingly

interface ImageUploadProps {
  onImageSelect: (image: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      onImageSelect(imageUrl);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        // style={{ display: 'none' }}
        id="imageInput"
      />
      
      {/* <label htmlFor="imageInput">
        <button>Select Image</button>
      </label> */}

      {selectedImage && <EasyCrop image={selectedImage} />}
    </div>
  );
};

export default ImageUpload;
