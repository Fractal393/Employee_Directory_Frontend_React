import React from "react";
import { useState } from "react";

export default function EmployeeList() {
  const [imageSrc, setImageSrc] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please upload an image file.");
        setImageSrc("");
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative w-48 h-48">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt="Uploaded Image"
            className="absolute inset-0 object-cover w-full h-full"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center border border-dashed border-gray-400">
            <span className="text-gray-400">
              {error ? error : "Upload an image"}
            </span>
          </div>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="border border-gray-400 rounded-md py-2 px-4"
      />
    </div>
  );
}
