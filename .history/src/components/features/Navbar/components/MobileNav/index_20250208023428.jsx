import { DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export const MobileNav = () => {
  return (
    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
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
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {["home", "explore", "category", "about"].map((section) => (
            <DisclosureButton
              as="a"
              href={`/#${section}`}
              key={section}
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-green-500 hover:text-white">
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </div>
  );
};
