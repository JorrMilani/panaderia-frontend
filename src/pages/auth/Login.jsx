import { useState } from "react";
import API from "../../api/axios";

function Login({ setPath }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Login:", form);

      const res = await API.post("/auth/login", form);

      console.log("Respuesta:", res.data);

      localStorage.setItem("token", res.data.token);

      alert("Login exitoso");

      setPath("/dashboard");
    } catch (error) {
      console.error(error.response?.data || error);
      alert("Error al iniciar sesión");
    }
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-80"
      >
        <h2 className="text-xl mb-4 text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          className="border p-2 w-full mb-3"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          className="border p-2 w-full mb-3"
        />

        <button className="bg-primary w-full p-2 rounded">
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;