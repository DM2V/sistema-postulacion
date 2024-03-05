import React, { ChangeEvent, useState, useEffect } from "react";
import { ImageInputProps } from "@/types/components/types.t";
import { ExclamationIcon, Eye, DeleteIcon } from "@/assets/icons/index";

const ImageInput: React.FC<ImageInputProps> = ({
  title,
  width,
  height,
  onChange,
  defaultValue,
}) => {
 const [imagePreview, setImagePreview] = useState<string | null>(null);
 const [errorMessage, setErrorMessage] = useState<string | null>(null);
 const [isModalOpen, setIsModalOpen] = useState(false);
 

 useEffect(() => {
  if (defaultValue) {
   if (typeof defaultValue === 'string') {
    setImagePreview(defaultValue);
   } else {
    const reader = new FileReader();
    reader.readAsDataURL(defaultValue);
    reader.onload = () => {
     setImagePreview(reader.result as string);
    };
   }
  }
 }, [defaultValue]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
   
      reader.onload = () => {
       const img = new Image();
       img.src = reader.result as string;
   
       img.onload = () => {
        if (img.width === width && img.height === height) {
         setImagePreview(reader.result as string);
         onChange?.(file);
         setErrorMessage(null);
        } else {
         const canvas = document.createElement('canvas');
         const ctx = canvas.getContext('2d')!;
         canvas.width = width;
         canvas.height = height;
         ctx.drawImage(img, 0, 0, width, height);
         const resizedImage = canvas.toDataURL('image/jpeg');
         
         setImagePreview(resizedImage);
         onChange?.(file);
         setErrorMessage(null);
        }
       };
      };
    } else {
      setImagePreview(null);
      onChange?.(null);
      setErrorMessage(null);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    onChange?.(null);
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="mb-3">
      <div  className="sm:flex items-center">
        <label className="block font-semibold text-gray-700">{title}</label>
        <div className=" ml-2 flex items-center text-xs">
          <ExclamationIcon />
          <p className="ml-1 text-gray-500">
            Esta imagen debe estar en formato PNG o JPG y tener un tamaño máximo
            de {width}x{height} píxeles.
          </p>
        </div>
      </div>
      <div className="rounded-lg border-2 border-gray-300  p-2">
        <div className="flex flex-col sm:flex-row items-center sm:justify-between">
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={handleFileChange}
            className="text-gray-600 w-full sm:w-auto mb-2 sm:mb-0"
            id="fileInput"
          />
          {imagePreview && (
            <div className="flex items-center">
              <div>
                <button
                  onClick={openModal}
                  className=" rounded  px-4 py-2 text-white  mr-2"
                >
                  <Eye />
                </button>
                {isModalOpen && (
                  <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="max-w-3xl rounded-md bg-slate-50 p-4 text-right">
                      <button
                        onClick={closeModal}
                        className="mb-2   rounded font-semibold text-gray-500"
                      >
                        X
                      </button>
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="h-auto max-w-full"
                      />
                    </div>
                  </div>
                )}
              </div>
              <button
                type="button"
                className="rounded px-4 py-2"
                onClick={handleRemoveImage}
              >
                <DeleteIcon />
              </button>
            </div>
          )}
        </div>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default ImageInput;