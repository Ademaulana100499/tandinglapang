import { createContext, useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";

const RoleContext = createContext();

export const useRole = () => {
  return useContext(RoleContext);
};

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const [roleId, setRoleId] = useState(null);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedRole = localStorage.getItem("role");
      const savedRoleId = localStorage.getItem("roleId");
      const savedEmail = localStorage.getItem("email");

      if (savedRole) {
        setRole(savedRole);
      } else {
        const roleFromCookie = Cookies.get("role");
        setRole(roleFromCookie || null);
      }

      if (savedRoleId) {
        setRoleId(savedRoleId);
      } else {
        const roleIdFromCookie = Cookies.get("roleId");
        setRoleId(roleIdFromCookie || null);
      }

      if (savedEmail) {
        setEmail(savedEmail);
      } else {
        const emailFromCookie = Cookies.get("email");
        setEmail(emailFromCookie || null);
      }
    }
  }, []);

  useEffect(() => {
    if (role !== null) {
      localStorage.setItem("role", role);
      Cookies.set("role", role, { expires: 7 });
    } else {
      localStorage.removeItem("role");
      Cookies.remove("role");
    }

    if (roleId !== null) {
      localStorage.setItem("roleId", roleId);
      Cookies.set("roleId", roleId, { expires: 7 });
    } else {
      localStorage.removeItem("roleId");
      Cookies.remove("roleId");
    }

    if (email !== null) {
      localStorage.setItem("email", email);
      Cookies.set("email", email, { expires: 7 });
    } else {
      localStorage.removeItem("email");
      Cookies.remove("email");
    }
  }, [role, roleId, email]);

  return (
    <RoleContext.Provider
      value={{ role, setRole, roleId, setRoleId, email, setEmail }}>
      {children}
    </RoleContext.Provider>
  );
};
