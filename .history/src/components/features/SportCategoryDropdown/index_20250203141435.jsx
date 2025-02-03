import { FiChevronDown } from "react-icons/fi";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { iconMap } from "../../../utils/imageIconData";
import { useSportCategories } from "@/hooks/useSportCategories";

const SportCategoryDropdown = ({ setSelectedCategory }) => {
  const [open, setOpen] = useState(false);
  const [selectedCategoryState, setSelectedCategoryState] = useState("");
  const { fetchCategories, loading, error, categories } = useSportCategories();

  useEffect(() => {
    // Fetch the categories when the component mounts
    fetchCategories();
  }, [fetchCategories]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category.id);
    setSelectedCategoryState(category.name);
    setOpen(false);
  };

  // Filter out duplicates by creating a Set of category ids
  const uniqueCategories = Array.from(
    new Set(categories.map((category) => category.id))
  ).map((id) => categories.find((category) => category.id === id));

  return (
    <motion.div animate={open ? "open" : "closed"} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 px-5 py-2 rounded-sm text-indigo-50 bg-black hover:bg-black transition-colors">
        <span className="font-medium">
          {selectedCategoryState || "Jenis Olahraga"}
        </span>
        <motion.span variants={iconVariants}>
          <FiChevronDown />
        </motion.span>
      </button>

      <motion.ul
        initial={wrapperVariants.closed}
        variants={wrapperVariants}
        style={{ originY: "top", translateX: "-50%" }}
        className="flex flex-col z-40 p-2 rounded-lg bg-white shadow-xl absolute top-[120%] left-[50%] w-48 overflow-hidden max-h-48 overflow-y-auto">
        {loading && <li>Loading...</li>}
        {error && (
          <li>
            Error: {error}{" "}
            <button onClick={() => setOpen(false)} className="text-indigo-600">
              Close
            </button>
          </li>
        )}
        {!loading &&
          !error &&
          uniqueCategories?.map((category) => (
            <Option
              key={category.id}
              category={category}
              setOpen={setOpen}
              Icon={iconMap[category.name.toLowerCase()] || iconMap["default"]}
              text={category.name}
              onClick={handleCategoryChange}
            />
          ))}
      </motion.ul>
    </motion.div>
  );
};

const Option = ({ text, Icon, setOpen, category, onClick }) => {
  const handleClick = () => {
    setOpen(false);
    onClick(category);
  };

  return (
    <motion.li
      variants={itemVariants}
      onClick={handleClick}
      className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-indigo-100 text-slate-700 hover:text-indigo-500 transition-colors cursor-pointer">
      <motion.span variants={actionIconVariants}>
        <Icon />
      </motion.span>
      <span>{text}</span>
    </motion.li>
  );
};

export default SportCategoryDropdown;

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.05,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.05,
    },
  },
};

const iconVariants = {
  open: { rotate: 180, transition: { duration: 0.2 } },
  closed: { rotate: 0, transition: { duration: 0.2 } },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
      duration: 0.2,
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: "afterChildren",
      duration: 0.2,
    },
  },
};

const actionIconVariants = {
  open: { scale: 1, y: 0, transition: { duration: 0.2 } },
  closed: { scale: 0, y: -7, transition: { duration: 0.2 } },
};
