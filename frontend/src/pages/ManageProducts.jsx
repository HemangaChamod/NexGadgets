import { useEffect, useState } from "react";
import API from "../axiosConfig";
import { toast } from "react-toastify";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await API.get("/admin/products");
      setProducts(data);
    } catch {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await API.delete(`/admin/products/${id}`);
      toast.success("Product deleted");
      fetchProducts();
    } catch {
      toast.error("Failed to delete");
    }
  };

  const startEdit = (product) => {
    setEditingProduct(product);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct({ ...editingProduct, [name]: value });
  };

  const saveEdit = async () => {
    try {
      await API.put(`/admin/products/${editingProduct._id}`, editingProduct);
      toast.success("Product updated");
      setEditingProduct(null);
      fetchProducts();
    } catch {
      toast.error("Update failed");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading Products...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Products</h2>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Price</th>
              <th className="p-3">Category</th>
              <th className="p-3">Stock</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="border-b hover:bg-gray-50">
                <td className="p-3">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="p-3">{p.name}</td>
                <td className="p-3">${p.price}</td>
                <td className="p-3">{p.category}</td>
                <td className="p-3">{p.countInStock}</td>
                <td className="p-3 text-right space-x-2">
                  <button
                    onClick={() => startEdit(p)}
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(p._id)}
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

      {/* Edit modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96 shadow">
            <h3 className="text-xl font-bold mb-4">Edit Product</h3>
            <div className="space-y-3">
              <input
                name="name"
                value={editingProduct.name}
                onChange={handleEditChange}
                placeholder="Name"
                className="w-full border px-3 py-2 rounded"
              />
              <input
                name="price"
                type="number"
                value={editingProduct.price}
                onChange={handleEditChange}
                placeholder="Price"
                className="w-full border px-3 py-2 rounded"
              />
              <input
                name="category"
                value={editingProduct.category}
                onChange={handleEditChange}
                placeholder="Category"
                className="w-full border px-3 py-2 rounded"
              />
              <input
                name="countInStock"
                type="number"
                value={editingProduct.countInStock}
                onChange={handleEditChange}
                placeholder="Stock"
                className="w-full border px-3 py-2 rounded"
              />
              <input
                name="image"
                value={editingProduct.image}
                onChange={handleEditChange}
                placeholder="Cloudinary Image URL"
                className="w-full border px-3 py-2 rounded"
              />
              <textarea
                name="description"
                value={editingProduct.description || ""}
                onChange={handleEditChange}
                placeholder="Description"
                rows="3"
                className="w-full border px-3 py-2 rounded"
              />
              <img
                src={editingProduct.image}
                alt="Preview"
                className="w-24 h-24 object-cover rounded mt-2"
              />
            </div>

            <div className="flex justify-end gap-2 mt-5">
              <button
                onClick={() => setEditingProduct(null)}
                className="bg-gray-400 text-white px-3 py-1 rounded"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
