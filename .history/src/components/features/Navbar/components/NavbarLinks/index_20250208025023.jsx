import Link from "next/link";
import { getCookie } from "cookies-next";
export const NavbarLinks = ({ activeSection, setActiveSection }) => {
  const email = getCookie("email");
  const isDibimbingEmail = email && email.endsWith("@dibimbing.com");
  return (
    <div className="flex flex-1 items-center gap-20 justify-center sm:items-stretch sm:justify-start">
      <div className="flex shrink-0 items-center text-white font-bold text-2xl">
        <Link href="/#">
          <span>
            Tanding<span className="text-green-500">Lapang</span>
          </span>
        </Link>
      </div>
      <div className="hidden sm:ml-6 sm:block">
        <div className="flex justify-center items-center space-x-4">
          {[
            "home",
            isDibimbingEmail ? "dashboard" : "explore",
            "category",
            "about",
          ].map((section) => (
            <Link
              key={section}
              href={
                section === "dashboard"
                  ? "/dashboard"
                  : section === "explore"
                  ? "/explore"
                  : `/#${section}`
              }
              className={`text-gray-500 rounded px-6 py-2 text-md font-medium ${
                activeSection === section ? "text-white" : "hover:text-white"
              }`}
              onClick={() => setActiveSection(section)}>
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
