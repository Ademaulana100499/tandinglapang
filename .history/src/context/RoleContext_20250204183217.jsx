import { createContext, useState, useEffect, useContext } from "react";

const RoleContext = createContext();

export const useRole = () => {
  return useContext(RoleContext);
};

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState(() => {
    if (typeof window !== "undefined") {
      const savedRole = localStorage.getItem("role");
      return savedRole ? JSON.parse(savedRole) : null;
    }
    return null;
  });

  useEffect(() => {
    if (role) {
      localStorage.setItem("role", JSON.stringify(role));
    } else {
      localStorage.removeItem("role");
    }
  }, [role]);

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};
