import React, { useState, useEffect } from "react";
import { useSportCategories } from "@/hooks/useSportCategories";
import { CreateCategorySport } from "@/components/Activity/CreateCategorySport";
const AllSportCategories = () => {
  const { fetchCategories, loading, error, categories } = useSportCategories();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const [isOpenCreateCategory, setIsOpenCreateCategory] = useState(false);
  useEffect(() => {
    fetchCategories();
  }, []);

  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const paginatedCategories = categories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen flex flex-col justify-between max-w-screen container mx-auto p-5">
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          setIsOpenCreateCategory(true);
        }}
        className="text-green-600 mt-2  hover:underline">
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
                className="bg-white shadow-lg p-6 transition transform hover:scale-105  border-2 border-gray-400 hover:border-black">
                <h2 className="text-xl font-semibold text-black">
                  {category.name}
                </h2>
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
      <CreateCategorySport
        isOpen={isOpenCreateCategory}
        setIsOpen={setIsOpenCreateCategory}
      />
    </div>
  );
};

export default AllSportCategories;
