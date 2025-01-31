export const PaginationActivity = ({ page, handlePageChange, hasMoreData }) => {
  return (
    <div className="mt-8 p-4 mb-10">
      {hasMoreData && (
        <div className="flex justify-center ">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page <= 1}
            className="px-6 py-2 bg-white text-gray-800 rounded-l-lg shadow-md hover:bg-gray-100 disabled:opacity-50 transition-colors flex items-center gap-2">
            Sebelumnya
          </button>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={!hasMoreData}
            className="px-6 py-2 bg-white text-gray-800 rounded-r-lg shadow-md hover:bg-gray-100 disabled:opacity-50 transition-colors flex items-center gap-2">
            Berikutnya
          </button>
        </div>
      )}
    </div>
  );
};
