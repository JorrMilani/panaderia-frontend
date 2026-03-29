import { createContext, useContext, useState } from "react";
import { loginRequest } from "../services/authService";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (data) => {
    try {
      console.log("Intentando login...", data);

      const res = await loginRequest(data);

      console.log("RESPUESTA BACKEND:", res.data);

      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);

      alert("Login exitoso");

    } catch (error) {
      console.error("ERROR LOGIN:", error.response || error);
      alert("Error al iniciar sesión");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};