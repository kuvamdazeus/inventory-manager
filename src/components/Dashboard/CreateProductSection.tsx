import axios from "axios";
import { useEffect, useState } from "react";

export default function CreateProductSection() {
  const [categories, setCategories] = useState<any>([]);

  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productPrice, setProductPrice] = useState(0);

  const createProduct = async () => {
    if (!productName || !productPrice || !productCategory) {
      return;
    }

    await axios.post(
      `${import.meta.env.VITE_BASE_URL}/create-product`,
      {
        name: productName,
        price: productPrice,
        categoryId: productCategory,
      },
      {
        headers: {
          token: localStorage.getItem("token") || "",
        },
      }
    );

    window.location.reload();
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/categories`)
      .then((res) => {
        setCategories(res.data);
        setProductCategory(res.data[0]._id);
      })
      .catch((err) => console.error(err.response));
  }, []);

  return (
    <section className="flex flex-col items-center">
      <p className="text-xl font-bold text-gray-700 mb-5">Create Product</p>

      <input
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        placeholder="Product Name"
        className="p-1 text-lg w-80 rounded border-2 mb-3"
      />

      <input
        value={productPrice || ""}
        onChange={(e) => setProductPrice(parseInt(e.target.value))}
        placeholder="Product Price in Rs"
        type="number"
        className="p-1 text-lg w-80 rounded border-2 mb-3"
      />

      <div className="flex items-center mb-3">
        <p className="mr-3">Choose Category: </p>
        <select
          value={productCategory}
          onChange={(e) => setProductCategory(e.target.value)}
          className="border p-1 rounded text-lg cursor-pointer"
        >
          {categories.map((category: any) => (
            <option key={category._id}>{category._id}</option>
          ))}
        </select>
      </div>

      <button onClick={createProduct} className="text-lg bg-blue-500 rounded py-1 px-3 font-bold text-white mb-5">
        Create Product
      </button>
    </section>
  );
}
