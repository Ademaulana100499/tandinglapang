export const LoginButton = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        setIsLoginOpen(true);
      }}
      className="px-6 py-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 transition-all">
      Masuk
    </button>
  );
};
