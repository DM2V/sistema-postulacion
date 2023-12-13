import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import Slider from  'rc-slider';
import getCroppedImg from './Crop';

interface EasyCropProps {
  image: string | null; 
}

const EasyCrop: React.FC<EasyCropProps> = ({ image }) => {
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null); 
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  const onCropComplete = useCallback(
    (croppedArea: any, croppedAreaPixels: any) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImg = await getCroppedImg(image!, croppedAreaPixels, rotation);
      console.log("done", { croppedImage: croppedImg });
      setCroppedImage(croppedImg);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation, image]);

  const onClose = useCallback(() => {
    setCroppedImage(null);
  }, []);

  const handleRotationChange = (value: number | number[]) => {
    const newRotation = Array.isArray(value) ? value[0] : value;
    setRotation(newRotation);
  };

  const handleZoomChange = (value: number | number[]) => {
    const newZoom = Array.isArray(value) ? value[0] : value;

    setZoom(newZoom);
  };
  return (
    <div>
      <button
        style={{
          display: image === null || croppedImage !== null ? "none" : "block",
        }}
        onClick={showCroppedImage}
      >
        Crop
      </button>
      <div
        className="container mx-auto p-4"
        style={{
          display: image === null || croppedImage !== null ? "none" : "block",
        }}
      >
        <div className="relative overflow-hidden rounded-lg border-2 border-gray-200">
          <Cropper
            image={image!}
            crop={crop}
            rotation={rotation}
            zoom={zoom}
            zoomSpeed={4}
            maxZoom={3}
            zoomWithScroll={true}
            showGrid={true}
            aspect={4 / 3}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            onRotationChange={setRotation}
          />
        </div>
        <div className="flex items-center space-x-4 mt-4">
          <label>
            Rotate
            <Slider
              value={rotation}
              min={0}
              max={360}
              step={1}
              aria-labelledby="rotate"
              onChange={handleRotationChange}
              className="range"
            />
          </label>
          <label>
            Zoom
            <Slider
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="zoom"
              onChange={handleZoomChange}
              className="range"
            />
          </label>
        </div>
      </div>
      <div className="relative overflow-hidden rounded-lg border-2 border-gray-200 mt-4">
        {croppedImage && (
          <img className="w-full h-auto" src={croppedImage} alt="cropped" />
        )}
        {croppedImage && <button onClick={onClose}>close</button>}
      </div>
    </div>
  );
};

export default EasyCrop;
