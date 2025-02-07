import { motion, AnimatePresence } from "framer-motion";
import useCreateCategorySport from "@/hooks/useCreateCategorySport";
import { BarLoader } from "../../Features/Loading";

export const CreateCategorySport = ({ isOpen, setIsOpen }) => {
  const { formData, setFormData, handleFormCreate, isLoading } =
    useCreateCategorySport(setIsOpen, fetchCategories);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-black bg-opacity-60 fixed inset-0 z-50 flex justify-center items-center min-h-screen p-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-6 shadow-xl w-full max-w-md text-gray-800 relative">
            <h3 className="text-xl font-bold mb-2 text-center">
              Buat Kategori
            </h3>
            <form
              className="w-full text-xs xl:text-base grid grid-cols-1 gap-2"
              onSubmit={handleFormCreate}>
              <input
                type="text"
                placeholder="Jenis Olahraga"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="p-2  rounded border border-gray-300 focus:ring-2 focus:ring-green-500 w-full"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-all flex items-center justify-center">
                  {isLoading ? <BarLoader /> : "Buat Kategori"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-full  bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-all">
                  Batal
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
