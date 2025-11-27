import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export default function CartPage() {
  const { state, dispatch } = useContext(CartContext);
  const navigate = useNavigate();
  const { cartItems } = state;

  const handleRemove = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
    toast.success("Item removed from cart", {
      style: { borderRadius: "10px", background: "#333", color: "#fff" },
    });
  };

  const handleClearCart = () => {
    dispatch({ type: "CLEAR_CART" });
    toast.success("Cart cleared", {
      style: { borderRadius: "10px", background: "#333", color: "#fff" },
    });
  };

  const incrementQty = (id) => dispatch({ type: "INCREMENT_QTY", payload: id });
  const decrementQty = (id) => dispatch({ type: "DECREMENT_QTY", payload: id });

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * (item.qty || 1),
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
          alt="Empty Cart"
          className="mx-auto mb-6 w-32 opacity-80"
        />
        <h2 className="text-2xl font-semibold mb-3">Your cart is empty</h2>
        <p className="text-gray-600 mb-6">
          Looks like you haven’t added anything yet.
        </p>
        <button
          onClick={() => navigate("/products")}
          className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">
      {/* Cart Items */}
      <div className="md:col-span-2 space-y-6">
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg border"
              />
              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-600 text-sm">${item.price.toFixed(2)}</p>
                <div className="flex items-center gap-2 mt-3">
                  <button
                    className="p-1 border rounded hover:bg-gray-100"
                    onClick={() => decrementQty(item._id)}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-3">{item.qty || 1}</span>
                  <button
                    className="p-1 border rounded hover:bg-gray-100"
                    onClick={() => incrementQty(item._id)}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div className="text-right">
              <p className="text-lg font-semibold mb-1">
                ${(item.price * (item.qty || 1)).toFixed(2)}
              </p>
              <button
                type="button"
                onClick={() => handleRemove(item._id)}
                className="text-red-500 hover:text-red-700 flex items-center gap-1 text-sm"
              >
                <Trash2 size={16} /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="bg-white shadow-md rounded-xl p-6 h-fit sticky top-20">
        <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

        <div className="flex justify-between mb-2 text-gray-700">
          <span>Subtotal</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <div className="flex justify-between mb-2 text-gray-700">
          <span>Shipping</span>
          <span>$5.00</span>
        </div>

        <div className="flex justify-between text-lg font-semibold border-t pt-3">
          <span>Total</span>
          <span>${(total + 5).toFixed(2)}</span>
        </div>

        <button
          onClick={() => navigate("/checkout")}
          className="w-full bg-primary text-white py-3 rounded-lg mt-6 hover:bg-primary/90 transition"
        >
          Proceed to Checkout
        </button>

        <button
          onClick={handleClearCart}
          className="w-full border border-red-500 text-red-500 py-3 rounded-lg mt-3 hover:bg-red-500 hover:text-white transition"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
}
