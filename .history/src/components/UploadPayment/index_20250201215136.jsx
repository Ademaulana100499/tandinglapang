import React, { useState } from "react";

export const UploadPayment = ({ transactionId }) => {
  const [imageUrl, setImageUrl] = useState("");

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/upload-image`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json(); // Parsing JSON response
      console.log("response", data);
      setImageUrl(data.result); // Assuming 'result' is the correct field in the response
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleUpload} />
      {imageUrl && <img src={imageUrl} alt="Uploaded" />}{" "}
      {/* Display image if URL exists */}
    </div>
  );
};
