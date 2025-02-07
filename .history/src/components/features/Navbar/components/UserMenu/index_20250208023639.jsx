import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { useNavbar } from "@/hooks/useNavbar";
import { useLogout } from "@/hooks/useLogout";
import Link from "next/link";

export const UserMenu = () => {
  const { data, loading, token } = useNavbar();
  const { handleButtonLogout } = useLogout();

  if (loading) return <p>Loading...</p>;

  return token ? (
    <Menu as="div" className="relative ml-3">
      <div className="flex justify-center gap-3 items-center">
        <MenuButton className="relative transition duration-1000 flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
          <img
            alt="user profile"
            src="https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
            className="size-8 rounded-full"
          />
        </MenuButton>
      </div>
      <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md backdrop-blur-md bg-black/70 py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden">
        <MenuItem>
          <Link
            href={"/profile"}
            className="block px-4 py-2 text-sm text-white">
            Profile
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            href="/my-transaction"
            className="block px-4 py-2 text-sm text-white">
            Transaksi
          </Link>
        </MenuItem>
        <MenuItem>
          <button
            onClick={handleButtonLogout}
            className="block px-4 py-2 text-sm text-white">
            Log out
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  ) : null;
};
