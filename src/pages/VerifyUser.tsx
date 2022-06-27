import axios from "axios";
import { useEffect, useState } from "react";

export default function VerifyUser() {
  const token = new URL(window.location.href).searchParams.get("token") as string;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [linkIsValid, setLinkIsValid] = useState(true);
  const [error, setError] = useState("");

  const updatePassword = async () => {
    if (password !== confirmPassword) {
      return setError("passwords don't match!");
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/update-profile`,
        { password },
        {
          headers: {
            token,
          },
        }
      );

      console.log(res.data);
      localStorage.setItem("token", token);
      window.location.reload();
    } catch (err: any) {
      console.error(err);
      setError(err.response.data.message);
    }
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/verify-link?token=${token}`)
      .then(() => setLinkIsValid(true))
      .catch(() => setLinkIsValid(false));
  }, []);

  if (linkIsValid)
    return (
      <section className="flex flex-col items-center pt-20">
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New Password"
          className="text-xl p-3 w-80 border-2 rounded mb-3"
          type="password"
        />

        <input
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm New Password"
          className="text-xl p-3 w-80 border-2 rounded mb-3"
          type="password"
        />

        {error && <p className="text-red-400 mb-5">{error}</p>}

        <button onClick={updatePassword} className="text-white font-bold text-xl py-2 px-5 bg-blue-500 rounded">
          Reset Password
        </button>
      </section>
    );

  return <p className="text-center text-2xl font-bold text-red-400 mt-20">Invalid Link! Please generate a new one</p>;
}
