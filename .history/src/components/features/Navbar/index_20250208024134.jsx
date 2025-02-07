import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState, useEffect } from "react";
import useNavbar from "@/hooks/useNavbar";
import { useLogout } from "@/hooks/useLogout";
import { LoginModal } from "@/components/Authentication/LoginModal";
import { NavbarLinks } from "./NavbarLinks";
import { UserMenu } from "./UserMenu";

export const Navbar = () => {
  const { data, loading, token } = useNavbar();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { handleButtonLogout } = useLogout();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

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
      className={`w-screen sticky top-0 z-50 transition duration-1000 ${
        isScrolled ? "backdrop-blur-md bg-black/20" : "bg-black"
      }`}>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <NavbarLinks
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            setIsOpen={setIsOpen}
          />
          <UserMenu
            loading={loading}
            token={token}
            data={data}
            handleButtonLogout={handleButtonLogout}
            setIsLoginOpen={setIsLoginOpen}
          />
        </div>
      </div>
      <LoginModal isOpen={isLoginOpen} setIsOpen={setIsLoginOpen} />
    </Disclosure>
  );
};
