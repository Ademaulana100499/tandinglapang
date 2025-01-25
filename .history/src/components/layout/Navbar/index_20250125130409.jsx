import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import useNavbar from "@/hooks/useNavbar";
import { useState, useEffect } from "react";

const navigation = [
  { name: "Home", href: "#home", current: false },
  { name: "Explore", href: "#explore", current: false },
  { name: "About", href: "#about", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const Navbar = () => {
  const { data, loading, token } = useNavbar();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(""); // Menyimpan ID section aktif

  const handleScroll = () => {
    // Deteksi posisi scroll
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    // Cek setiap section ID jika berada dalam tampilan
    navigation.forEach((item) => {
      const element = document.querySelector(item.href); // Mengambil elemen dengan ID tertentu
      if (element) {
        const rect = element.getBoundingClientRect();
        // Jika elemen berada dalam viewport, set activeSection ke ID elemen
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
          setActiveSection(item.href);
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
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      activeSection === item.href
                        ? "text-white"
                        : "text-gray-500 hover:text-white",
                      "rounded px-6 py-2 text-md font-medium"
                    )}>
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {loading ? (
              <p>Loading...</p>
            ) : token ? (
              <div className="flex justify-center gap-3 items-center">
                {/* User Profile */}
                <img
                  alt="user profile"
                  src="https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
                  className="size-8 rounded-full"
                />
              </div>
            ) : (
              <Link
                href="/login"
                className="text-gray-300 px-4 py-2 hover:bg-green-600 hover:text-white bg-green-500 rounded">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
      <div>
        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 px-2 pt-2 pb-3">
            {navigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                className={classNames(
                  activeSection === item.href
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                  "block rounded-md px-3 py-2 text-base font-medium"
                )}>
                {item.name}
              </DisclosureButton>
            ))}
          </div>
        </DisclosurePanel>
      </div>
    </Disclosure>
  );
};
