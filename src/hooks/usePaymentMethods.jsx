import { useState, useEffect } from "react";

export const usePaymentMethods = (isOpen) => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      if (!isOpen) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/payment-methods`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch payment methods");
        }
        const data = await response.json();
        setPaymentMethods(data.result || []);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching payment methods:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentMethods();
  }, [isOpen]);

  return { paymentMethods, loading, error };
};
