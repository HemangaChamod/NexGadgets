import React, { useEffect, useState } from "react";
import API from "../axiosConfig";
import { FaCheckCircle, FaTimesCircle, FaBoxOpen } from "react-icons/fa";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await API.get("/orders/myorders");
        setOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[50vh] text-gray-500">
        <span className="animate-pulse">Loading your orders...</span>
      </div>
    );

  if (orders.length === 0)
    return (
      <div className="text-center py-20">
        <FaBoxOpen className="mx-auto text-6xl text-gray-400 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">No Orders Yet</h2>
        <p className="text-gray-500">You haven’t placed any orders yet.</p>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">My Orders</h2>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white border border-gray-200 shadow-md rounded-xl p-6 hover:shadow-lg transition-shadow"
          >
            {/* Order Header */}
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="font-mono text-gray-800">{order._id}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Placed On</p>
                <p className="text-gray-800">{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            {/* Order Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Total</span>
                <span className="text-lg font-semibold text-gray-800">${order.totalPrice}</span>
              </div>

              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Payment Status</span>
                <span
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                    order.isPaid ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}
                >
                  {order.isPaid ? (
                    <>
                      <FaCheckCircle /> Paid
                    </>
                  ) : (
                    <>
                      <FaTimesCircle /> Not Paid
                    </>
                  )}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Delivery Status</span>
                <span
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                    order.isDelivered ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.isDelivered ? (
                    <>
                      <FaCheckCircle /> Delivered
                    </>
                  ) : (
                    <>
                      <FaBoxOpen /> Processing
                    </>
                  )}
                </span>
              </div>
            </div>

            {/* Order Footer */}
            <div className="mt-6 border-t pt-4 flex justify-end">
              <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrdersPage;
