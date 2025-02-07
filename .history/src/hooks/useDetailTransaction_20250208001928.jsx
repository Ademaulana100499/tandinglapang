import React from "react";

export const useDetailTransaction = () => {
  const fetchData = async () => {
    if (!id) return;
    console.log("Fetching data for transaction ID:", id);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/transaction/${id}`,
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      setData(res.data.result);
    } catch (error) {
      console.error("Error fetching transaction details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);
  return { fetchData };
};
