import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import { UserMenu } from "./UserMenu";
import { LoginButton } from "./LoginButton";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  return (
    <Disclosure
      as="nav"
      className={`w-screen sticky top-0 z-50 transition duration-1000 ${
        isScrolled ? "backdrop-blur-md bg-black/20" : "bg-black"
      }`}>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <MobileNav />
          <DesktopNav />
          <UserMenu />
          <LoginButton />
        </div>
      </div>
    </Disclosure>
  );
};
