import { useEffect, useState } from "react";
import API from "../axiosConfig"; 
import { toast } from "react-toastify";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await API.get("/admin/orders"); 
      setOrders(data);
    } catch (err) {
      console.error("Fetch orders error:", err);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkDelivered = async (id) => {
    try {
      await API.put(`/admin/orders/${id}/deliver`);
      toast.success("Order marked as delivered");
      setOrders((prev) =>
        prev.map((o) => (o._id === id ? { ...o, isDelivered: true } : o))
      );
    } catch (err) {
      console.error("Mark delivered error:", err);
      toast.error("Failed to update order");
    }
  };

  const deleteOrder = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      await API.delete(`/admin/orders/${id}`);
      toast.success("Order deleted");
      fetchOrders(); // Refresh
    } catch (err) {
      console.error("Delete order error:", err);
      toast.error("Failed to delete order");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading Orders...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Orders</h2>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-3">Order ID</th>
              <th className="p-3">User</th>
              <th className="p-3">Date</th>
              <th className="p-3">Total</th>
              <th className="p-3">Paid</th>
              <th className="p-3">Delivered</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{order._id}</td>
                <td className="p-3">
                  {order.user
                    ? `${order.user.name} (${order.user.email})`
                    : "N/A"}
                </td>
                <td className="p-3">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3">${order.totalPrice.toFixed(2)}</td>
                <td className="p-3">
                  {order.isPaid ? (
                    <span className="text-green-600 font-semibold">Paid</span>
                  ) : (
                    <span className="text-red-600 font-semibold">Not Paid</span>
                  )}
                </td>
                <td className="p-3">
                  {order.isDelivered ? (
                    <span className="text-green-600 font-semibold">Delivered</span>
                  ) : (
                    <span className="text-yellow-600 font-semibold">Pending</span>
                  )}
                </td>
                <td className="p-3 text-right space-x-2">
                  <button
                    onClick={() => handleMarkDelivered(order._id)}
                    disabled={order.isDelivered}
                    className={`px-3 py-1 rounded-md text-white mb-2 ${
                      order.isDelivered
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {order.isDelivered ? "Delivered" : "Mark as Delivered"}
                  </button>
                  <button
                    onClick={() => deleteOrder(order._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageOrders;
