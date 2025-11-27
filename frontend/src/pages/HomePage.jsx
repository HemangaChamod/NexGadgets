import Hero from "../components/Hero";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import CTABanner from "../components/CTABanner";

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      try {
        const baseURL = import.meta.env.VITE_API_URL;
        const res = await axios.get(`${baseURL}/api/products`);
        setFeaturedProducts(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load featured products. Please try again later.");
        setFeaturedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Hero />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
            <p className="text-center sm:col-span-2 md:col-span-3 lg:col-span-4 text-gray-500">
              Loading products...
            </p>
          ) : error ? (
            <p className="text-center sm:col-span-2 md:col-span-3 lg:col-span-4 text-red-500">
              {error}
            </p>
          ) : featuredProducts.length > 0 ? (
            featuredProducts.map(
              (product) => product && <ProductCard key={product._id} product={product} />
            )
          ) : (
            <p className="text-center sm:col-span-2 md:col-span-3 lg:col-span-4 text-gray-500">
              No featured products available.
            </p>
          )}
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
