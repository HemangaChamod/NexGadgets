import React from "react";
import { Link, Outlet, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminLayout = () => {
  const location = useLocation();
  const { user, loading } = useAuth(); // assume your context has a loading flag

  // While user data is loading, don't render anything
  if (loading) return <p>Loading...</p>;

  // Redirect non-admin users
  if (!user || !user.isAdmin) {
    return <Navigate to="/" replace />;
  }

  const navItems = [
    { path: "/admin/dashboard", label: "Dashboard" },
    { path: "/admin/users", label: "Users" },
    { path: "/admin/products", label: "Products" },
    { path: "/admin/orders", label: "Orders" },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-5 space-y-6">
        <h2 className="text-2xl font-bold text-center mb-6">Admin Panel</h2>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-4 py-2 rounded-lg transition ${
                location.pathname === item.path
                  ? "bg-blue-600"
                  : "hover:bg-gray-700"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Page Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
