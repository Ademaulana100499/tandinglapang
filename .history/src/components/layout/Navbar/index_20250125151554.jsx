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
import { useState, useEffect } from "react";

export const Navbar = () => {
  const { data, loading, token } = useNavbar();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const handleScroll = () => {
    if (window.scrollY > window.innerHeight / 2) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
    const sections = ["home", "explore", "category", "about"];
    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) {
        const elementTop = element.offsetTop;
        const elementHeight = element.offsetHeight;
        if (
          window.scrollY + window.innerHeight / 2 >= elementTop &&
          window.scrollY + window.innerHeight / 2 < elementTop + elementHeight
        ) {
          setActiveSection(section);
        }
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Disclosure
      as="nav"
      className={`w-screen sticky top-0 z-50 transition duration-1000  ${
        isScrolled ? "backdrop-blur-md  bg-black/20" : "bg-black"
      }`}>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-black hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-open:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-open:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center gap-20 justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center text-white font-bold text-2xl">
              <Link href="/#">
                <span>
                  Sewa<span className="text-green-500">Lapang</span>
                </span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex justify-center items-center space-x-4">
                {/* Navigation Links */}
                <Link
                  href="/#home"
                  className={`text-gray-500 rounded px-6 py-2 text-md font-medium ${
                    activeSection === "home" ? "text-white" : "hover:text-white"
                  }`}>
                  Home
                </Link>
                <Link
                  href="/explore"
                  className={`text-gray-500 rounded px-6 py-2 text-md font-medium ${
                    activeSection === "explore"
                      ? "text-white"
                      : "hover:text-white"
                  }`}>
                  Explore
                </Link>
                <Link
                  href="/#category"
                  className={`text-gray-500 rounded px-6 py-2 text-md font-medium ${
                    activeSection === "category"
                      ? "text-white"
                      : "hover:text-white"
                  }`}>
                  Category
                </Link>
                <Link
                  href="/#about"
                  className={`text-gray-500 rounded px-6 py-2 text-md font-medium ${
                    activeSection === "about"
                      ? "text-white"
                      : "hover:text-white"
                  }`}>
                  About
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {loading ? (
              <p>Loading...</p>
            ) : token ? (
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
                  <div className="hidden sm:block md:block ">
                    <p className="text-sm md:text-xs text-white mb-0">
                      {data?.name}
                    </p>
                    <p className="text-xs text-white ">{data?.role}</p>
                  </div>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md backdrop-blur-md bg-black/70 py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100  data-enter:ease-out data-leave:duration-75 data-leave:ease-in">
                  <MenuItem>
                    <a
                      href="/profile"
                      className="block px-4 py-2 text-sm text-white data-focus:bg-gray-100 data-focus:outline-hidden">
                      Your Profile
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-white data-focus:bg-gray-100 data-focus:outline-hidden">
                      Sign out
                    </a>
                  </MenuItem>
                </MenuItems>
              </Menu>
            ) : (
              <Link
                href="/login"
                className="text-gray-300 px-4 py-2 hover:bg-green-600 hover:text-white  bg-green-500 rounded">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
      <div>
        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 px-2 pt-2 pb-3">
            {/* Mobile Menu Links */}
            <DisclosureButton
              as="a"
              href="/#home"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
              Home
            </DisclosureButton>
            <DisclosureButton
              as="a"
              href="/explore"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
              Explore
            </DisclosureButton>
            <DisclosureButton
              as="a"
              href="/#category"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
              Category
            </DisclosureButton>
            <DisclosureButton
              as="a"
              href="/#about"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
              About
            </DisclosureButton>
          </div>
        </DisclosurePanel>
      </div>
    </Disclosure>
  );
};
