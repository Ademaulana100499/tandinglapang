import { useRouter } from "next/router";
import Select from "react-select";
import { useProvince } from "@/hooks/useProvince";
import { useCity } from "@/hooks/useCity";
import { useSportCategory } from "@/hooks/useSportCategory";

const LocationAndSportCategoryDropdown = () => {
  const router = useRouter();
  const [categoryPage, setCategoryPage] = useState(1);

  const {
    provinces,
    loading: loadingProvinces,
    totalPages: totalProvincePages,
    selectedProvince,
    handleProvinceChange,
    handleProvincePageChange,
  } = useProvince();

  const {
    cities,
    loading: loadingCities,
    selectedCity,
    handleCityChange,
  } = useCity(selectedProvince ? selectedProvince.value : null);

  const {
    categories,
    loading: loadingCategories,
    selectedCategory,
    handleCategoryChange,
  } = useSportCategory(categoryPage);

  const handleSearch = () => {
    const query = {
      sport_category_id: selectedCategory || "",
      city_id: selectedCity ? selectedCity.value : "",
    };

    router.push({
      pathname: "/explore",
      query,
    });
  };

  return (
    <div>
      {loadingProvinces || loadingCities || loadingCategories ? (
        <p>Loading...</p>
      ) : (
        <>
          <div>
            <button
              onClick={() => handleProvincePageChange(provincePage - 1)}
              disabled={provincePage === 1}>
              &laquo;
            </button>
            <span>Provinsi {provincePage}</span>
            <button
              onClick={() => handleProvincePageChange(provincePage + 1)}
              disabled={provincePage === totalProvincePages}>
              &raquo;
            </button>
          </div>

          <div>
            <Select
              value={selectedProvince}
              onChange={handleProvinceChange}
              options={provinces.map((province) => ({
                value: province.province_id,
                label: province.province_name,
              }))}
              placeholder="Pilih Provinsi"
            />
          </div>

          {selectedProvince && (
            <div>
              <Select
                value={selectedCity}
                onChange={handleCityChange}
                options={cities.map((city) => ({
                  value: city.city_id,
                  label: city.city_name,
                }))}
                placeholder="Pilih Kota"
              />
            </div>
          )}

          <div>
            <button
              onClick={() => setCategoryPage(categoryPage - 1)}
              disabled={categoryPage === 1}>
              &laquo;
            </button>
            <span>Sport {categoryPage}</span>
            <button
              onClick={() => setCategoryPage(categoryPage + 1)}
              disabled={categories.length < 5}>
              &raquo;
            </button>
          </div>

          <div>
            <select value={selectedCategory} onChange={handleCategoryChange}>
              <option value="">Pilih kategori</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <button onClick={handleSearch}>Cari</button>
          </div>
        </>
      )}
    </div>
  );
};

export default LocationAndSportCategoryDropdown;
