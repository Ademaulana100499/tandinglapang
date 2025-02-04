import { createContext, useState, useEffect, useContext } from "react";

const RoleContext = createContext();

export const useRole = () => {
  return useContext(RoleContext);
};

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("role") || null;
    }
    return null;
  });

  const [roleId, setRoleId] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("roleId") || null;
    }
    return null;
  });

  useEffect(() => {
    if (role) {
      localStorage.setItem("role", role);
    } else {
      localStorage.removeItem("role");
    }

    if (roleId) {
      localStorage.setItem("roleId", roleId);
    } else {
      localStorage.removeItem("roleId");
    }
  }, [role, roleId]);

  return (
    <RoleContext.Provider value={{ role, setRole, roleId, setRoleId }}>
      {children}
    </RoleContext.Provider>
  );
};
