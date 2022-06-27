import axios from "axios";
import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import Dashboard from "./pages/Dashboard";
import VerifyUser from "./pages/VerifyUser";
import Home from "./pages/Home";
import { userAtom } from "./state";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const setUser = useSetRecoilState(userAtom);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/verify-session?token=${localStorage.getItem("token")}`)
      .then((res) => {
        setUser(res.data);

        if (location.pathname !== "/dashboard") {
          navigate("/dashboard");
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <section>
      <Routes>
        <Route path="/verify" element={<VerifyUser />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route index element={<Home />} />
      </Routes>
    </section>
  );
}
