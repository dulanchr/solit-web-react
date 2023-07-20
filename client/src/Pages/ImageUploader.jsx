import React, { useState } from "react";

import { storage } from "../firebase";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

const ImageUploader = () => {
  // imageuploading
  const [imageUpload, setImageUpload] = useState(null);
  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `CourseThumbs/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then(() => {
      alert("Image Uploaded");
    });
  };

  return (
    <div>
      <div className="navbgc">
        <p>.</p>
      </div>
      <h1>Upload Image Page</h1>
      <input
        type="file"
        accept="image/*"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      <button onClick={uploadImage}>Upload</button>
    </div>
  );
};

export default ImageUploader;
