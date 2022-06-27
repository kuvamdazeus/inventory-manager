import axios from "axios";
import { useState } from "react";
import { IProduct } from "../../types";

interface Props {
  product: IProduct;
}

export default function Product({ product }: Props) {
  const [editedProductName, setEditedProductName] = useState("");
  const [editedProductPrice, setEditedProductPrice] = useState(0);

  const [editingMode, setEditingMode] = useState(false);

  const saveEditedProduct = async () => {
    const update = {
      name: editedProductName || product.name,
      price: editedProductPrice || product.price,
    };

    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/update-product`,
      {
        _id: product._id,
        update,
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

  const deleteEditedProduct = async () => {
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/delete-product`,
      {
        _id: product._id,
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

  return (
    <>
      <div className="border border-gray-400 w-80 mb-1 flex items-center justify-between">
        {editingMode ? (
          <div className="p-1">
            <input
              onChange={(e) => setEditedProductName(e.target.value)}
              placeholder={product.name}
              className="border mb-1 p-1"
            />

            <input
              onChange={(e) => setEditedProductPrice(parseInt(e.target.value))}
              type="number"
              placeholder={`${product.price}`}
              className="border p-1"
            />
          </div>
        ) : (
          <div className="">
            <p className="text-xl">{product.name}</p>
            <p className="text-sm font-bold text-green-500">{product.price} Rs.</p>
          </div>
        )}

        <button onClick={() => setEditingMode(!editingMode)} className="text-blue-500 underline font-bold mr-2">
          {editingMode ? "Cancel" : "Edit"}
        </button>
      </div>

      {editingMode && (
        <>
          <button onClick={saveEditedProduct} className="text-white bg-blue-500 font-bold py-1 w-80 rounded mb-1">
            Save
          </button>
          <br />
          <button onClick={deleteEditedProduct} className="text-white bg-red-500 font-bold py-1 w-80 rounded mb-7">
            Delete
          </button>
        </>
      )}
    </>
  );
}
