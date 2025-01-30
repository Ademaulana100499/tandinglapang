import { useEffect, useState } from "react";
import axios from "axios";

const SportDropdown = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/sport-categories`
        );
        setCategories(response.data.result.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  // Handle category change
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className="relative z-50">
      <label
        htmlFor="sport-category"
        className="block text-sm font-medium text-indigo-50">
        Jenis Olahraga
      </label>
      <select
        id="sport-category"
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
        <option value="" disabled>
          Pilih Jenis Olahraga
        </option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SportDropdown;
