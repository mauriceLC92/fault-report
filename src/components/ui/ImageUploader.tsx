import { JSX } from 'react'
import { Camera, X } from 'lucide-react';
import { ChangeEvent } from 'react';

interface ImageUploaderProps {
  image: string | null;
  onImageUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  onImageRemove: () => void;
}

const ImageUploader = ({ image, onImageUpload, onImageRemove }: ImageUploaderProps): JSX.Element => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image (Optional)</label>
      <div className="flex items-center justify-center w-full">
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Camera className="w-8 h-8 mb-2 text-gray-500" />
            <p className="text-xs text-gray-500">Click to upload photo</p>
          </div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onImageUpload}
          />
        </label>
      </div>
      {image && (
        <div className="mt-2 relative">
          <img src={image} alt="Preview" className="h-20 w-auto rounded" />
          <button
            type="button"
            onClick={onImageRemove}
            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
          >
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;