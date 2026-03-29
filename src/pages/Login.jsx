import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Formulario enviado", form);
    await login(form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-dark">
          Iniciar Sesión
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-lg"
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-lg"
        />

        <button
          type="submit"
          className="w-full bg-primary text-white p-3 rounded-lg hover:bg-secondary transition"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;