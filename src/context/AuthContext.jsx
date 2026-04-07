import { createContext, useContext, useState } from "react";
import API from "../api/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (data) => {
    try {
      console.log("Intentando login...", data);

      const res = await API.post("/auth/login", data);

      console.log("RESPUESTA BACKEND:", res.data);

      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);

      alert("Login exitoso 🚀");
    } catch (error) {
      console.error(error);
      alert("Error en login");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);