// import React from "react";
// import Link from "next/link";
// import useNavbar from "@/hooks/useNavbar";
// export const Navbar = () => {
//   const { data, loading, token } = useNavbar();
//   return (
//     <div className="flex justify-between bg-red-500">
//       <Link href="/">Navbar</Link>
//       <Link href="/explore">Explore</Link>

//       {loading ? (
//         <p>Loading...</p>
//       ) : token ? (
//         <Link href="/profile">
//           {data?.name} <br />
//           <p className="text-sm">{data?.role}</p>
//         </Link>
//       ) : (
//         <Link href="/login">Login</Link>
//       )}
//     </div>
//   );
// };

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

const navigation = [
  { name: "Home", href: "#", current: true },
  { name: "Explore", href: "#", current: false },
  { name: "Contact", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const Navbar = () => {
  return (
    <Disclosure as="nav" className="bg-gray-900 sticky top-0 z-50 shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="p-2 text-white hover:bg-gray-700 rounded-md">
              <Bars3Icon className="block size-6" aria-hidden="true" />
            </DisclosureButton>
          </div>

          {/* Navigation Centered */}
          <div className="flex flex-1 justify-center">
            <div className="flex space-x-6">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "text-white border-b-2 border-red-500"
                      : "text-gray-300 hover:text-white hover:border-red-500",
                    "px-3 py-2 text-lg font-semibold transition"
                  )}>
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Profile Dropdown */}
          <div className="absolute inset-y-0 right-0 flex items-center">
            <Menu as="div" className="relative">
              <div>
                <MenuButton className="flex rounded-full bg-gray-900 text-white p-1">
                  <img
                    className="size-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="User"
                  />
                </MenuButton>
              </div>
              <MenuItems className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Your Profile
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Settings
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Sign out
                  </a>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>
    </Disclosure>
  );
};
