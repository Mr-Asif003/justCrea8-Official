// components/ImageUploader.jsx
import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage, auth,db} from '../../Firebase/firebaseConfig' // customize paths
import { updateProfile } from 'firebase/auth';
import { v4 as uuidv4 } from 'uuid';
import getCroppedImg from '../utils/cropImage'; // helper

const ImageUploader = ({ onUploadSuccess }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [uploading, setUploading] = useState(false);

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImageSrc(reader.result);
    };
  };

  const handleUpload = async () => {
    try {
      setUploading(true);
      const croppedImageBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
      const imageRef = ref(storage, `profile_pics/${auth.currentUser.uid}-${uuidv4()}.jpg`);
      await uploadBytes(imageRef, croppedImageBlob);
      const url = await getDownloadURL(imageRef);

      // Save to user profile
      await updateProfile(auth.currentUser, {
        photoURL: url,
      });

      if (onUploadSuccess) onUploadSuccess(url);
      setImageSrc(null);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <input type="file" accept="image/*" onChange={handleFileChange} className="file-input" />

      {imageSrc && (
        <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>
      )}

      {imageSrc && (
        <div className="flex gap-2">
          <button
            onClick={handleUpload}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            {uploading ? 'Uploading...' : 'Save Photo'}
          </button>
          <button
            onClick={() => setImageSrc(null)}
            className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
