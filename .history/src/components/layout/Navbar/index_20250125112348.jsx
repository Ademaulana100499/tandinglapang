import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import useNavbar from "@/hooks/useNavbar";

const navigation = [
  { name: "Home", href: "/", current: false },
  { name: "Explore", href: "/explore", current: false },
  { name: "About", href: "/#about", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const Navbar = () => {
  const { data, loading, token } = useNavbar();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activePage, setActivePage] = useState("/");
  const router = useRouter();

  useEffect(() => {
    setActivePage(router.pathname);
  }, [router.pathname]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Disclosure
      as="nav"
      className={`w-screen sticky top-0 z-50 transition duration-500 ${
        isScrolled ? "backdrop-blur-md bg-black/20" : "bg-black"
      }`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-white text-2xl font-bold">
              Sewa<span className="text-green-500">Lapang</span>
            </Link>
            <div className="hidden sm:block ml-10">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      activePage === item.href
                        ? "text-white"
                        : "text-gray-400 hover:text-white",
                      "px-3 py-2 text-md font-medium"
                    )}>
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center">
            {loading ? (
              <p className="text-white">Loading...</p>
            ) : token ? (
              <Menu as="div" className="relative">
                <MenuButton className="flex items-center text-white focus:outline-none">
                  <img
                    src="https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
                    className="h-8 w-8 rounded-full"
                    alt="User profile"
                  />
                  <span className="ml-2 hidden sm:inline-block">
                    {data?.name}
                  </span>
                </MenuButton>
                <MenuItems className="absolute right-0 mt-2 w-48 bg-black/70 backdrop-blur-md text-white rounded-md shadow-lg">
                  <MenuItem>
                    {({ active }) => (
                      <Link
                        href="/profile"
                        className={`block px-4 py-2 text-sm ${
                          active ? "bg-gray-700" : ""
                        }`}>
                        Your Profile
                      </Link>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <button
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          active ? "bg-gray-700" : ""
                        }`}>
                        Sign Out
                      </button>
                    )}
                  </MenuItem>
                </MenuItems>
              </Menu>
            ) : (
              <Link
                href="/login"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </Disclosure>
  );
};
