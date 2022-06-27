import axios from "axios";
import { useEffect, useState } from "react";
import { IOrderedProducts, IProduct } from "../../types";
import Product from "./Product";

export default function ProductSection() {
  const [products, setProducts] = useState<IOrderedProducts | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const sortedProducts = {} as IOrderedProducts;
      let totalCategories: string[] = [];

      const data = (await axios.get(`${import.meta.env.VITE_BASE_URL}/products`)).data as IProduct[];
      data.forEach((product) => {
        sortedProducts[product.categoryId] = data.filter(
          (filteredProduct) => filteredProduct.categoryId === product.categoryId
        );
      });

      totalCategories = Array.from(new Set(data.map((product) => product.categoryId)));

      setProducts(sortedProducts);
      setCategories(totalCategories);
      console.log(sortedProducts);
    }

    fetchProducts();
  }, []);

  return (
    <section className="flex flex-col items-center pb-5">
      <p className="text-center text-xl font-bold text-gray-700 mb-5">Listed Products</p>

      {categories.map((category) => (
        <div key={category} className="mb-5">
          <p className="font-bold underline italic">{category}</p>

          {products && products[category].map((product) => <Product key={product.name} product={product} />)}
        </div>
      ))}
    </section>
  );
}
