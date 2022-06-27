import axios from "axios";
import { useEffect, useState } from "react";
import Category from "./Category";

export default function CategorySection() {
  const [categories, setCategories] = useState<{ _id: string }[]>([]);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/categories`)
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err.response));
  }, []);

  const createCategory = async () => {
    if (!categoryName) {
      return;
    }

    await axios.post(
      `${import.meta.env.VITE_BASE_URL}/create-category`,
      {
        _id: categoryName,
      },
      {
        headers: {
          token: localStorage.getItem("token") || "",
        },
      }
    );

    window.location.reload();
  };

  return (
    <section className="flex flex-col items-center pb-5">
      <p className="text-center text-xl font-bold text-gray-700 mb-5">Listed Categories</p>

      <section className="mb-5">
        {categories.map((category) => (
          <Category key={category._id} category={category} />
        ))}
      </section>

      <input
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value.replace(" ", "-").trim())}
        placeholder="Category Name"
        className="p-1 mb-1 text-lg w-80 rounded border-2"
      />

      <button onClick={createCategory} className="text-lg bg-blue-500 rounded py-2 font-bold text-white mb-5 w-80">
        Create
      </button>
    </section>
  );
}
