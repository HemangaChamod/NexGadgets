import { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

export default function PaymentSuccess() {
  const { user } = useAuth();
  const { dispatch } = useContext(CartContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL; 

  useEffect(() => {
    const saveOrderToDB = async () => {
      const params = new URLSearchParams(location.search);
      const sessionId = params.get("session_id");

      if (!sessionId || !user) {
        toast.error("Invalid session or user not logged in");
        navigate("/cart");
        return;
      }

      try {
        const { data } = await axios.get(
          `${API_URL}/api/payment/session/${sessionId}`,
          { headers: { Authorization: `Bearer ${user.token}` } }
        );

        await axios.post(
          `${API_URL}/api/orders`,
          {
            orderItems: data.orderItems,
            totalPrice: data.totalPrice,
          },
          { headers: { Authorization: `Bearer ${user.token}` } }
        );

        toast.success("Payment successful! Order saved 🎉");
        dispatch({ type: "CLEAR_CART" });
      } catch (error) {
        console.error(error);
        toast.error(
          "Payment succeeded but failed to save order. Contact support."
        );
      } finally {
        setLoading(false);
      }
    };

    saveOrderToDB();
  }, [location, user, dispatch, navigate, API_URL]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <p className="animate-pulse text-gray-600">Processing your order...</p>
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        🎉 Payment Successful!
      </h1>
      <p className="text-gray-700 mb-6">
        Your order has been placed and is being processed.
      </p>
      <button
        onClick={() => navigate("/myorders")}
        className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90"
      >
        View My Orders
      </button>
    </div>
  );
}
