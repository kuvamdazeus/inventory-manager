import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const login = async () => {
    let formError = "";

    if (email.trim().length === 0 || password.trim().length === 0) {
      formError = "Field(s) left empty";
    }

    if (formError) return setError(formError);

    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/login`, { email, password });
      console.log(res.data.message);

      localStorage.setItem("token", res.data.token);

      setError("");
      navigate("/dashboard");
    } catch (err: any) {
      console.error(err.response);

      return setError(err.response.data.message);
    }
  };

  const forgotPassword = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/forgot-password`, {
        email,
      });

      console.log(res.data);
    } catch (err: any) {
      setError(err.response.data.message);
      console.log(err.response.data);
    }
  };

  return (
    <div className="border p-3">
      <input
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        type="email"
        className="py-1 px-3 text-lg border rounded mb-1"
      />
      <br />

      <input
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
        className="py-1 px-3 text-lg border rounded mb-1"
      />
      <br />

      <button onClick={forgotPassword} className="text-blue-500 underline font-bold mr-2">
        Forgot Password?
      </button>

      <center>
        <button
          onClick={login}
          className="
            mt-7 py-2 px-5 text-lg font-bold bg-blue-500 rounded text-white
          "
        >
          Login
        </button>
      </center>

      {error && <p className="mt-3 text-center text-red-400 text-sm">{error}</p>}
    </div>
  );
}
