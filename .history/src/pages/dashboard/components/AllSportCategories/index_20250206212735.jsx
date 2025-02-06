import React, { useState, useEffect } from "react";
import { useSportCategories } from "@/hooks/useSportCategories";
import { CreateCategorySport } from "@/components/Activity/CreateCategorySport";
import { Pencil, Trash } from "lucide-react";
import { EditCategorySport } from "@/components/Activity/EditCategorySport";
import { useDeleteSportCategory } from "@/hooks/useDeleteSportCategory";
import { iconMap } from "@/utils/imageIconData";
const AllSportCategories = () => {
  const { fetchCategories, loading, error, categories } = useSportCategories();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const [isOpenCreateCategory, setIsOpenCreateCategory] = useState(false);
  const [isOpenEditCategory, setIsOpenEditCategory] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const { handleDelete } = useDeleteSportCategory();

  const handleDeleteCategory = async (id) => {
    await handleDelete(id);
    fetchCategories();
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const paginatedCategories = categories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen  max-w-screen container mx-auto p-5">
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          setIsOpenCreateCategory(true);
        }}
        className=" mb-6 px-4 py-2 bg-black text-white rounded hover:bg-gray-800   ">
        Buat Kategori Baru
      </button>
      {loading ? (
        <p className="text-center text-black font-semibold">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500 font-semibold">{error}</p>
      ) : categories.length > 0 ? (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedCategories.map((category) => (
              <div
                key={category.id}
                className="bg-white shadow-lg p-6 transition transform hover:scale-105 border-2 border-gray-400 hover:border-black">
                <div className="flex items-center justify-between">
                  <img
                    src={iconMap[category.name]}
                    alt={category.name}
                    className="w-12 h-12 mr-4"
                  />
                  <h2 className="text-xl font-semibold text-black">
                    {category.name}
                  </h2>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => {
                        setSelectedCategoryId(category.id);
                        setIsOpenEditCategory(true);
                      }}
                      className="text-blue-500 p-2 rounded-xl hover:bg-gray-300">
                      <Pencil size={20} />
                    </button>

                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="text-red-500 p-2 rounded-xl hover:bg-gray-300">
                      <Trash size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="text-black hover:underline disabled:opacity-50">
                &laquo; Sebelumnya
              </button>
              <span className="text-black font-semibold py-2">
                Halaman {currentPage} dari {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="text-black hover:underline disabled:opacity-50">
                Selanjutnya &raquo;
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-4 py-10 bg-white rounded-sm border-2 border-black">
          <p className="text-center text-lg font-semibold text-black">
            Belum ada kategori olahraga.
          </p>
        </div>
      )}
      <EditCategorySport
        isOpen={isOpenEditCategory}
        setIsOpen={setIsOpenEditCategory}
        categoryId={selectedCategoryId}
      />

      <CreateCategorySport
        isOpen={isOpenCreateCategory}
        setIsOpen={setIsOpenCreateCategory}
      />
    </div>
  );
};

export default AllSportCategories;
