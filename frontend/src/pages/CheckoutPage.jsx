import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function CheckoutPage() {
  const { state } = useContext(CartContext);
  const { user } = useAuth();
  const { cartItems } = state;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  // Total including quantity
  const total = cartItems.reduce((acc, item) => acc + item.price * (item.qty || 1), 0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePay = async () => {
    if (!user || !user.token) {
      toast.error("Please log in before payment");
      navigate("/login");
      return;
    }

    if (!formData.fullName || !formData.address || !formData.city) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const baseURL = import.meta.env.VITE_API_URL;

      const { data } = await axios.post(
        `${baseURL}/api/payment/create-checkout-session`,
        { orderItems: cartItems, totalPrice: total },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      if (data?.url) {
        window.location.href = data.url; // Redirect to Stripe checkout
      } else {
        toast.error("Failed to initiate payment!");
      }
    } catch (err) {
      console.error("Payment error:", err.response || err);
      toast.error(err.response?.data?.message || "Failed to initiate payment!");
    }
  };

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
        <button
          onClick={() => navigate("/products")}
          className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
      {/* Left: Shipping Form */}
      <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md border">
        <h2 className="text-2xl font-semibold mb-6">Shipping Information</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-600">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-gray-600">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600">Postal Code</label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-600">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
            />
          </div>
        </form>
      </div>

      {/* Right: Order Summary */}
      <div className="bg-white p-6 rounded-lg shadow-md border h-fit">
        <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>

        <div className="divide-y">
          {cartItems.map((item) => (
            <div key={item._id} className="py-3 flex justify-between items-center">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-gray-500 text-sm">
                  ${item.price} x {item.qty || 1}
                </p>
              </div>
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-md"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-between font-semibold text-lg mt-6">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <button
          onClick={handlePay}
          className="w-full mt-6 bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition"
        >
          Pay ${total.toFixed(2)}
        </button>
      </div>
    </div>
  );
}
