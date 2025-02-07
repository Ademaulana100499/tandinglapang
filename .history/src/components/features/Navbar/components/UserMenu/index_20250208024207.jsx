import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export const UserMenu = ({
  loading,
  token,
  data,
  handleButtonLogout,
  setIsLoginOpen,
}) => {
  if (loading) return <p>Loading...</p>;

  if (token) {
    return (
      <Menu as="div" className="relative ml-3">
        <div className="flex justify-center gap-3 items-center">
          <MenuButton className="relative transition duration-1000 flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
            <span className="absolute -inset-1.5" />
            <span className="sr-only">Open user menu</span>
            <img
              alt="user profile"
              src="https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
              className="size-8 rounded-full"
            />
          </MenuButton>
          <div className="hidden lg:block">
            <p className="text-sm text-white mb-0">{data?.name}</p>
            <p className="text-xs text-white">{data?.role}</p>
          </div>
        </div>
        <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md backdrop-blur-md bg-black/70 py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden">
          <MenuItem>
            <Link
              href="/profile"
              className="block px-4 py-2 text-sm text-white hover:bg-gray-100">
              Profile
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              href="/my-transaction"
              className="block px-4 py-2 text-sm text-white hover:bg-gray-100">
              Transaksi
            </Link>
          </MenuItem>
          <MenuItem>
            <button
              onClick={handleButtonLogout}
              className="block px-4 py-2 text-sm text-white hover:bg-gray-100">
              Log out
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    );
  }

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
