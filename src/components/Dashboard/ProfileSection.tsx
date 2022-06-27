import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userAtom } from "../../state";

export default function ProfileSection() {
  const navigate = useNavigate();

  const [user, setUser] = useRecoilState(userAtom);

  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedPassword, setEditedPassword] = useState("");
  const [editedAvatarUrl, setEditedAvatarUrl] = useState("");

  const [editingMode, setEditingMode] = useState(false);
  const [error, setError] = useState("");

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

  const saveEditedDetails = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/update-profile`,
        {
          name: editedName || user?.name,
          email: editedEmail || user?.email,
          password: editedPassword.trim(),
          avatarUrl: editedAvatarUrl || user?.avatarUrl,
        },
        {
          headers: {
            token: localStorage.getItem("token") || "",
          },
        }
      );

      window.location.reload();
    } catch (err: any) {
      console.log(err.response);
      setError(err.response.data.message);
    }
  };

  return (
    <section className="pt-5">
      <center>
        {editingMode ? (
          <input
            onChange={(e) => setEditedAvatarUrl(e.target.value)}
            placeholder={`(Avatar URL) ${user?.avatarUrl}`}
            className="border text-lg mb-3 w-80"
          />
        ) : (
          <img className="object-contain w-40 mb-5" src={user?.avatarUrl} />
        )}
      </center>

      <section className="flex flex-col items-center w-full">
        <div className="flex justify-between items-center w-80 border p-1 text-lg">
          <p>Name</p>

          {editingMode ? (
            <input onChange={(e) => setEditedName(e.target.value)} placeholder={user?.name} className="border" />
          ) : (
            <p>{user?.name}</p>
          )}
        </div>

        <div className="flex justify-between items-center w-80 border p-1 text-lg">
          <p>Email</p>

          {editingMode ? (
            <input onChange={(e) => setEditedEmail(e.target.value)} placeholder={user?.email} className="border" />
          ) : (
            <p>{user?.email}</p>
          )}
        </div>

        <div className="flex justify-between items-center w-80 border p-1 text-lg mb-3">
          <p>Password</p>
          {editingMode ? (
            <input onChange={(e) => setEditedPassword(e.target.value)} placeholder="**********" className="border" />
          ) : (
            <p>***********</p>
          )}
        </div>

        <div className="flex justify-between items-center w-80 p-1 text-lg mb-3">
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.reload();
            }}
            className="underline font-bold text-red-500"
          >
            Log Out
          </button>

          <button onClick={() => setEditingMode(!editingMode)} className="underline font-bold text-blue-500">
            {editingMode ? "Cancel" : "Edit"}
          </button>
        </div>

        {editingMode && (
          <button onClick={saveEditedDetails} className="py-2 font-bold text-white bg-blue-500 rounded w-80">
            Save
          </button>
        )}

        {error && <p className="mt-5 text-red-400">{error}</p>}
      </section>
    </section>
  );
}
