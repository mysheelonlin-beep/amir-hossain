import { useState, useRef, type ChangeEvent } from 'react';
import { Camera, Upload, Check, X, AlertCircle } from 'lucide-react';
import { Dish } from '../types';

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  dishes: Dish[];
  onImageUpdated: (dishId: string, newImageUrl: string) => void;
  defaultDishId?: string;
}

export default function ImageUploadModal({
  isOpen,
  onClose,
  dishes,
  onImageUpdated,
  defaultDishId,
}: ImageUploadModalProps) {
  const [selectedDishId, setSelectedDishId] = useState<string>(
    defaultDishId || 'chicken-madhfoon'
  );
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileData, setFileData] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const currentDish = dishes.find((d) => d.id === selectedDishId) || dishes[0];

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please select a valid image file (JPG, PNG, WebP)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setFileData(base64);
      setPreviewUrl(base64);
      setErrorMessage(null);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!fileData || !selectedDishId) {
      setErrorMessage('Please select an image first.');
      return;
    }

    setIsUploading(true);
    setErrorMessage(null);

    try {
      // Save directly via backend endpoint so it persists on the server
      const res = await fetch('/api/upload-dish-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dishId: selectedDishId,
          imageData: fileData,
        }),
      });

      const data = await res.json();
      if (res.ok && data.url) {
        // Also save to localStorage for client durability
        try {
          localStorage.setItem(`custom_dish_img_${selectedDishId}`, data.url);
        } catch {
          // ignore quota error
        }

        onImageUpdated(selectedDishId, data.url);
        setSuccessMessage(`Image for "${currentDish?.name}" updated successfully!`);
        setTimeout(() => {
          onClose();
          setSuccessMessage(null);
          setPreviewUrl(null);
          setFileData(null);
        }, 1500);
      } else {
        // Fallback: save data url directly in browser
        try {
          localStorage.setItem(`custom_dish_img_${selectedDishId}`, fileData);
        } catch {
          // ignore quota
        }
        onImageUpdated(selectedDishId, fileData);
        setSuccessMessage(`Image for "${currentDish?.name}" saved successfully!`);
        setTimeout(() => {
          onClose();
          setSuccessMessage(null);
          setPreviewUrl(null);
          setFileData(null);
        }, 1500);
      }
    } catch {
      // Offline / fallback direct Base64
      try {
        localStorage.setItem(`custom_dish_img_${selectedDishId}`, fileData);
      } catch {
        // ignore
      }
      onImageUpdated(selectedDishId, fileData);
      setSuccessMessage(`Image for "${currentDish?.name}" updated successfully!`);
      setTimeout(() => {
        onClose();
        setSuccessMessage(null);
        setPreviewUrl(null);
      }, 1500);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#E7E0D8] p-6 sm:p-8 animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-[#D95F25]/10 flex items-center justify-center text-[#D95F25]">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#111827]">
                Update Dish Photo (আসল ছবি যুক্ত করুন)
              </h3>
              <p className="text-xs text-[#6B7280]">
                Replace with your 100% exact restaurant food photo
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="mt-5 space-y-4">
          {/* Dish Selector */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Select Dish to Update (কোন খাবারের ছবি পরিবর্তন করবেন):
            </label>
            <select
              value={selectedDishId}
              onChange={(e) => setSelectedDishId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm font-medium focus:ring-2 focus:ring-[#D95F25] focus:border-transparent outline-none bg-white text-gray-800"
            >
              <optgroup label="Chicken Dishes (চিকেন মেনু)">
                {dishes
                  .filter((d) => d.category === 'chicken')
                  .map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.arabicName}) — AED {d.price}
                    </option>
                  ))}
              </optgroup>
              <optgroup label="Other Dishes (অন্যান্য খাবার)">
                {dishes
                  .filter((d) => d.category !== 'chicken')
                  .slice(0, 8)
                  .map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} — AED {d.price}
                    </option>
                  ))}
              </optgroup>
            </select>
          </div>

          {/* Current & Preview Box */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div>
              <span className="block text-[11px] font-medium text-gray-500 mb-1">
                Current Photo (বর্তমান ছবি)
              </span>
              <div className="aspect-[4/3] rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                <img
                  src={currentDish.image}
                  alt={currentDish.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div>
              <span className="block text-[11px] font-medium text-[#D95F25] mb-1 font-bold">
                New Upload Preview (নতুন ছবি)
              </span>
              <div className="aspect-[4/3] rounded-xl overflow-hidden border-2 border-dashed border-[#D95F25]/40 bg-[#FAF7F2] flex items-center justify-center relative">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="New preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-2 text-gray-400">
                    <Upload className="w-6 h-6 mx-auto mb-1 text-gray-300" />
                    <span className="text-[10px] block leading-tight">
                      Click below to select image
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          {/* Select File Button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full py-3 px-4 rounded-xl border border-gray-300 hover:border-[#D95F25] hover:bg-[#D95F25]/5 text-gray-700 font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Upload className="w-4 h-4 text-[#D95F25]" />
            <span>Select Image File from Device (গ্যালারি থেকে ছবি সিলেক্ট করুন)</span>
          </button>

          {/* Messages */}
          {errorMessage && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 text-red-700 text-xs">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-green-50 text-green-700 text-xs font-semibold">
              <Check className="w-4 h-4 flex-shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Submit Action Button */}
          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-full border border-gray-300 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!fileData || isUploading}
              onClick={handleUpload}
              className={`flex-1 py-2.5 rounded-full text-white text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md ${
                !fileData || isUploading
                  ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                  : 'bg-[#D95F25] hover:bg-[#C94F1F] active:scale-[0.98]'
              }`}
            >
              {isUploading ? (
                <span>Saving...</span>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Set as Real Photo</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
