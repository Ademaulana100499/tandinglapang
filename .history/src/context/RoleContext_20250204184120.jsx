import { createContext, useState, useEffect, useContext } from "react";
import { setCookie, getCookie, deleteCookie } from "cookies-next";

const RoleContext = createContext();

export const useRole = () => {
  return useContext(RoleContext);
};

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState(() => {
    if (typeof window !== "undefined") {
      return getCookie("role") || null;
    }
    return null;
  });

  useEffect(() => {
    if (role) {
      setCookie("role", role);
    } else {
      deleteCookie("role");
    }
  }, [role]);

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};
