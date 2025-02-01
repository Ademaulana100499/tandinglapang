import React, { useState } from "react";

export const UploadPayment = ({ transactionId }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validasi tipe file
    const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setError("Format gambar tidak didukung. Gunakan JPG, PNG, atau WEBP.");
      return;
    }

    // Validasi ukuran file (maksimal 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setError("Ukuran gambar terlalu besar. Maksimal 2MB.");
      return;
    }

    setError(""); // Reset error sebelum upload

    const formData = new FormData();
    formData.append("image", file);

    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/upload-image`,
        {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Upload gagal, coba lagi.");
      }

      const data = await response.json();
      if (!data.imageUrl) {
        throw new Error("Gagal mendapatkan URL gambar.");
      }

      setImageUrl(data.imageUrl);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleUpload} accept="image/*" />
      {loading && <p>Uploading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {imageUrl && (
        <div>
          <p>Uploaded Image:</p>
          <a href={imageUrl} target="_blank" rel="noopener noreferrer">
            <img src={imageUrl} alt="Uploaded" style={{ maxWidth: "100px" }} />
          </a>
        </div>
      )}
    </div>
  );
};
