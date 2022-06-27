import { Navigate } from "react-router-dom";
import CategorySection from "../components/Dashboard/CategorySection";
import CreateProductSection from "../components/Dashboard/CreateProductSection";
import ProductSection from "../components/Dashboard/ProductSection";
import ProfileSection from "../components/Dashboard/ProfileSection";

export default function Dashboard() {
  const tokenExists = !!localStorage.getItem("token");

  if (tokenExists)
    return (
      <section>
        <ProfileSection />
        <div className="w-full h-px bg-gray-200 mt-3 mb-7" />

        <CreateProductSection />
        <div className="w-full h-px bg-gray-200 mt-3 mb-7" />

        <CategorySection />
        <div className="w-full h-px bg-gray-200 mt-3 mb-7" />

        <ProductSection />
      </section>
    );

  return <Navigate to="/" replace />;
}
