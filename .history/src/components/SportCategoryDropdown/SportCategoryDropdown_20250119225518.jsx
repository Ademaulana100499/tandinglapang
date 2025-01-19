// components/SportCategoryDropdown.js
import { useState, useEffect } from "react";
import axios from "axios";

const SportCategoryDropdown = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/sport-activities`
        );
        setCategories(response.data.result.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <select value={selectedCategory} onChange={handleChange}>
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default SportCategoryDropdown;
