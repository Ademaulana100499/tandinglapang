import { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "your-cookie-utils-path"; // Ensure getCookie is imported if needed

export const useSportCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      let currentPage = 1;
      let allCategories = [];
      let cancelTokenSource = axios.CancelToken.source(); // for canceling requests if needed

      try {
        while (true) {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/sport-categories?page=${currentPage}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getCookie("token")}`,
              },
              cancelToken: cancelTokenSource.token, // cancel token
            }
          );

          // Append categories from this page to the total list
          allCategories = [...allCategories, ...response.data.result.data];

          // Check for the next page URL to continue fetching
          if (response.data.result.next_page_url) {
            currentPage++;
          } else {
            break;
          }
        }

        setCategories(allCategories); // Set the categories once all pages are fetched
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Request canceled:", err.message);
        } else {
          setError("Error fetching categories");
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();

    // Cleanup function to cancel ongoing requests if the component unmounts
    return () => {
      cancelTokenSource.cancel("Operation canceled by the user.");
    };
  }, []);

  return { categories, loading, error };
};
