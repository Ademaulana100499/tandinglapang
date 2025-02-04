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

  const [roleId, setRoleId] = useState(() => {
    if (typeof window !== "undefined") {
      return getCookie("roleId") || null;
    }
    return null;
  });

  useEffect(() => {
    if (role) {
      setCookie("role", role);
    } else {
      deleteCookie("role");
    }
    if (roleId) {
      setCookie("roleId", roleId);
    } else {
      deleteCookie("roleId");
    }
  }, [role, roleId]);

  return (
    <RoleContext.Provider value={{ role, setRole, roleId, setRoleId }}>
      {children}
    </RoleContext.Provider>
  );
};
