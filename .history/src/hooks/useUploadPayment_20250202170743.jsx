import { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";

export const useUploadPayment = (transactionId) => {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) {
      setErrorMessage("Harap pilih file terlebih dahulu.");
      return;
    }

    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(selectedFile.type)) {
      setErrorMessage("Tipe file tidak valid. Harap pilih gambar.");
      setFile(null);
      return;
    }

    if (selectedFile.size > 512 * 1024) {
      setErrorMessage(
        "Ukuran file terlalu besar. Harap unggah gambar dengan ukuran maksimal 512KB."
      );
      setFile(null);
      return;
    }

    setErrorMessage("");
    setFile(selectedFile);
  };

  const uploadFile = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/upload-image`,
        formData
      );
      setUrl(response.data.result);
    } catch (err) {
      console.error("Terjadi kesalahan saat mengunggah file:", err);
    }
  };

  const updateProofPayment = async () => {
    if (!url) return;

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/transaction/update-proof-payment/${transactionId}`,
        { proof_payment_url: url },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      console.log("Bukti pembayaran berhasil diunggah:", response);
      window.location.reload();
    } catch (err) {
      console.error(
        "Terjadi kesalahan saat memperbarui bukti pembayaran:",
        err
      );
    }
  };

  useEffect(() => {
    if (file) {
      uploadFile();
    }
  }, [file]);

  return { handleFileChange, updateProofPayment, errorMessage, url };
};
