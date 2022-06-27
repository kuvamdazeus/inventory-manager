import axios from "axios";
import { useState } from "react";

interface Props {
  category: { _id: string };
}

export default function Category({ category }: Props) {
  const [editedCategory, setEditedCategory] = useState("");

  const [editingMode, setEditingMode] = useState(false);

  const saveEditedCategory = async () => {
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/update-category`,
      {
        _id: category._id,
        update: editedCategory,
      },
      {
        headers: {
          token: localStorage.getItem("token") as string,
        },
      }
    );

    console.log(res.data);

    window.location.reload();
  };

  const deleteCategory = async () => {
    await axios.post(
      `${import.meta.env.VITE_BASE_URL}/delete-category`,
      { _id: category._id },
      { headers: { token: localStorage.getItem("token") as string } }
    );

    window.location.reload();
  };

  return (
    <>
      <div className="border flex justify-between w-80 p-1">
        {editingMode ? (
          <input
            onChange={(e) => setEditedCategory(e.target.value.replace(" ", "-").trim())}
            placeholder={category._id}
            className="border"
          />
        ) : (
          <p className="text-lg">{category._id}</p>
        )}

        <div className="flex items-center">
          <button onClick={() => setEditingMode(!editingMode)} className="text-blue-500 underline font-bold mr-2">
            {editingMode ? "Cancel" : "Edit"}
          </button>

          <button onClick={deleteCategory} className="text-red-500 underline font-bold">
            Delete
          </button>
        </div>
      </div>

      {editingMode && (
        <button onClick={saveEditedCategory} className="text-white bg-blue-500 font-bold py-1 w-80 rounded mb-7">
          Save
        </button>
      )}
    </>
  );
}
