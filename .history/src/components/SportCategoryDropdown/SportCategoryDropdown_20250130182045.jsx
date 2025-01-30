import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { useRouter } from "next/router";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import {
  FiEdit,
  FiChevronDown,
  FiTrash,
  FiShare,
  FiPlusSquare,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import { IconType } from "react-icons";
export const LocationAndSportCategoryDropdown = () => {
  const router = useRouter();
  const [provinces, setProvinces] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchProvincesAndCities = async () => {
      let allProvinces = [];
      let page = 1;
      let hasMore = true;

      while (hasMore) {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/location/provinces?page=${page}`
          );

          const newProvinces = response.data.result.data;
          for (let province of newProvinces) {
            const citiesResponse = await axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}/location/cities/${province.province_id}`
            );
            province.cities = citiesResponse.data.result.data;
          }

          allProvinces = [...allProvinces, ...newProvinces];

          if (newProvinces.length < response.data.result.per_page) {
            hasMore = false;
          } else {
            page++;
          }
        } catch (error) {
          console.error("Error fetching provinces and cities:", error);
          hasMore = false;
        }
      }

      setProvinces(allProvinces);
    };

    fetchProvincesAndCities();
  }, []);

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

  const handleLocationChange = (selectedOption) => {
    setSelectedLocation(selectedOption);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId); // Set the selected category when clicked

    // Update the URL query with the selected category
    router.push({
      pathname: "/explore",
      query: {
        sport_category_id: categoryId,
        city_id: selectedLocation ? selectedLocation.value.city_id : "",
      },
    });
  };

  // Update the button click handler to use the same query update logic.
  const handleSearch = () => {
    const query = {
      sport_category_id: selectedCategory || "",
      city_id: selectedLocation ? selectedLocation.value.city_id : "",
    };

    router.push({
      pathname: "/explore",
      query,
    });
  };

  return (
    <div className="w-full mt-1 z-50 max-w-6xl mx-auto">
      <div className="flex flex-wrap items-center gap-2 ">
        <div className="w-full sm:w-60">
          <Select
            value={selectedLocation}
            onChange={handleLocationChange}
            options={provinces.map((province) => ({
              label: province.province_name,
              options: province.cities.map((city) => ({
                value: {
                  province_id: province.province_id,
                  city_id: city.city_id,
                },
                label: city.city_name_full,
              })),
            }))}
            placeholder="Pilih Kota"
            className="w-full p-1 border border-green-300 rounded-sm focus:ring-2 focus:ring-green-500 transition duration-200"
            styles={{
              menu: (provided) => ({
                ...provided,
                maxHeight: "200px",
                overflow: "hidden",
              }),
              control: (provided) => ({
                ...provided,
                minHeight: "40px",
              }),
            }}
          />
        </div>

        <div className=" min-w-30 border  p-1 border-green-300  rounded-sm focus:ring-2 focus:ring-green-500 transition duration-200">
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-full border p-2 border-green-300 rounded-sm">
            <option value="">Pilih Olahraga</option>
            {categories.length > 0 &&
              categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        <div className="w-40 ">
          <InteractiveHoverButton
            onClick={handleSearch}
            className=" bg-white py-2 text-black hover:border-black rounded-md">
            Cari Lawan
          </InteractiveHoverButton>
        </div>
      </div>
    </div>
  );
};
const Option = ({ text, Icon, setOpen }) => {
  return (
    <motion.li
      variants={itemVariants}
      onClick={() => setOpen(false)}
      className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-indigo-100 text-slate-700 hover:text-indigo-500 transition-colors cursor-pointer">
      <motion.span variants={actionIconVariants}>
        <Icon />
      </motion.span>
      <span>{text}</span>
    </motion.li>
  );
};

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: "afterChildren",
    },
  },
};

const actionIconVariants = {
  open: { scale: 1, y: 0 },
  closed: { scale: 0, y: -7 },
};
