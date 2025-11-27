import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [featured, setFeatured] = useState([]);
  const { dispatch } = useContext(CartContext);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL; 

  const { user } = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load product");
      }
    };
    fetchProduct();
  }, [id, API_URL]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products`);
        setFeatured(res.data.slice(0, 5));
      } catch (err) {
        console.error(err);
      }
    };
    fetchFeatured();
  }, [API_URL]);

  if (!product)
    return (
      <p className="text-center py-10 text-gray-500 text-lg">
        Loading product...
      </p>
    );

  const handleAddToCart = () => {
  if (!user) {
    toast.error("Please log in first.");
    return;
  }

  dispatch({ type: "ADD_ITEM", payload: { ...product, qty: 1 }, user });
  toast.success("Item added to cart!");
};

const handleBuyNow = () => {
  if (!user) {
    toast.error("Please log in first.");
    return;
  }

  dispatch({ type: "ADD_ITEM", payload: { ...product, qty: 1 }, user });
  navigate("/cart");
};

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* PRODUCT DETAILS */}
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-xl shadow-lg object-cover max-h-[450px]"
          />
          <div className="flex gap-4 mt-4">
            <img
              src={product.image}
              className="w-20 h-20 rounded-lg border object-cover cursor-pointer"
            />
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <div className="flex items-center gap-1 mb-4">
            <p className="text-yellow-500 text-lg">★★★★☆</p>
            <span className="text-gray-500 text-sm">(4.5)</span>
          </div>
          <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>
          <div className="flex items-end gap-3 mb-8">
            <p className="text-3xl font-bold text-gray-900">${product.price}</p>
            <p className="line-through text-gray-400">$1999.99</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className="w-1/2 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition font-semibold"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="w-1/2 bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition font-semibold"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* FEATURED PRODUCTS */}
      <div className="mt-20">
        <h2 className="text-center text-3xl font-bold mb-8">
          Featured <span className="text-orange-500">Products</span>
        </h2>
        <div className="grid md:grid-cols-5 gap-6">
          {featured.map((item) => (
            <div
              key={item._id}
              onClick={() => navigate(`/products/${item._id}`)}
              className="border p-4 rounded-xl shadow-sm hover:shadow-lg transition cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
              <h3 className="font-semibold text-gray-800 line-clamp-1">{item.name}</h3>
              <p className="text-gray-500 text-sm mt-1">${item.price}</p>
              <button className="mt-3 w-full py-2 text-sm border rounded-lg hover:bg-black hover:text-white transition">
                Buy Now
              </button>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <button
            onClick={() => navigate("/products")}
            className="px-6 py-3 border rounded-lg hover:bg-black hover:text-white transition"
          >
            See more
          </button>
        </div>
      </div>
    </div>
  );
}
