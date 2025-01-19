const activityPage = ({ data, page }) => {
  const router = useRouter();

  const handlePageChange = (newPage) => {
    router.push({
      pathname: "/explore",
      query: {
        ...router.query,
        page: newPage, // Mengubah halaman di query string
      },
    });
  };

  return (
    <div>
      <Navbar />
      <div className="bg-gray-100 min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Explore</h1>
        <SportCategoryDropdown />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((item) => (
            <div
              key={item.id}
              onClick={() => router.push(`/explore/${item.id}`)}
              className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-sm text-gray-600">
                Category: {item.sport_category.name}
              </p>
              <p className="text-sm">Address: {item.address}</p>
              <p className="text-sm">Price: {item.price}</p>
              <p className="text-sm">Discount: {item.price_discount}</p>
              <p className="text-sm">Slot: {item.slot}</p>
              <p className="text-sm">Date: {item.activity_date}</p>
              <p className="text-sm">
                Time: {item.start_time} - {item.end_time}
              </p>

              <h3 className="text-sm font-medium mt-2">Participants:</h3>
              <ul className="list-disc pl-4 text-sm">
                {item.participants.map((participant) => (
                  <li key={participant.id}>{participant.user.name}</li>
                ))}
              </ul>

              <p className="text-sm font-medium mt-2">
                Organizer: {item.organizer.name}
              </p>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page <= 1}
            className="px-4 py-2 bg-gray-300 rounded-l">
            Previous
          </button>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={data.length < 5}
            className="px-4 py-2 bg-gray-300 rounded-r">
            Next
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default activityPage;
