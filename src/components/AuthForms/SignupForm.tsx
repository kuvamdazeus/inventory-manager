import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignupForm() {
  const navigate = useNavigate();

  const defaultAvatarUrl = "/assets/default_profile.png";

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const [errors, setErrors] = useState<string[]>([]);
  const [canSubmit, setCanSubmit] = useState(true);

  const register = async () => {
    const formErrors = [];

    if (
      email.trim().length === 0 ||
      name.trim().length === 0 ||
      password.trim().length === 0 ||
      confirmPassword.trim().length === 0
    ) {
      formErrors.push("Field(s) left empty");
    }

    if (password !== confirmPassword) {
      formErrors.push("Passwords don't match");
    }

    setErrors(formErrors);
    if (formErrors.length !== 0) return;

    setCanSubmit(false);

    const user = {
      name: name.trim(),
      email: email.trim(),
      password,
      avatarUrl: avatarUrl.trim() || defaultAvatarUrl,
    };

    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/register`, user);
      localStorage.setItem("token", res.data.token);
      setErrors([]);
      navigate("/dashboard");
    } catch (err: any) {
      console.error(err.response);

      setCanSubmit(true);
      return setErrors([err.response.data.message]);
    }
  };

  return (
    <div className="border p-3">
      <center>
        <img alt="Invalid Image URL given!" className="object-contain w-32 mb-7" src={avatarUrl || defaultAvatarUrl} />
      </center>

      <input
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        type="email"
        className="py-1 px-3 text-lg border rounded mb-1"
      />
      <br />

      <input
        onChange={(e) => setName(e.target.value)}
        placeholder="Full Name"
        type="name"
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

      <input
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
        type="password"
        className="py-1 px-3 text-lg border rounded mb-1"
      />
      <br />

      <input
        onChange={(e) => setAvatarUrl(e.target.value)}
        placeholder="Paste Your Avatar URL"
        type="url"
        className="py-1 px-3 text-lg border rounded mb-1"
      />
      <br />

      <center>
        <button
          disabled={!canSubmit}
          onClick={register}
          className={`
            mt-7 py-2 px-5 text-lg font-bold ${canSubmit ? "bg-blue-500" : "bg-blue-300"} rounded text-white
          `}
        >
          Submit
        </button>
      </center>

      {errors && <p className="mt-3 text-center text-red-400 text-sm">{errors.join(", ")}</p>}
    </div>
  );
}
