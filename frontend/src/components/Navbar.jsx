import { ShoppingCart, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import AuthModal from "./AuthModal";
import { useNavigate } from "react-router-dom"; // <-- import this

export default function Navbar() {
  const { user, logout } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const navigate = useNavigate(); // <-- use this

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <h1 className="text-2xl font-bold text-primary tracking-tight">
            NexGadgets
          </h1>

          {/* Nav Links */}
          <div className="space-x-8 hidden md:flex">
            <a href="/" className="text-gray-700 hover:text-primary">Home</a>
            <a href="/products" className="text-gray-700 hover:text-primary">Products</a>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-6">
            {/* Cart */}
            <button
              onClick={() => navigate("/cart")} // <-- update path to your cart route
              className="flex items-center space-x-2 text-gray-600 hover:text-primary"
            >
              <ShoppingCart className="w-6 h-6" />
              <span>Cart</span>
            </button>

            {/* Account */}
            <div className="relative" ref={dropdownRef}>
              {!user ? (
                <button
                  onClick={() => setShowAuth(true)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-primary"
                >
                  <User className="w-6 h-6" />
                  <span>Account</span>
                </button>
              ) : (
                <button
                  onClick={() => setShowDropdown((prev) => !prev)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-primary"
                >
                  <User className="w-6 h-6" />
                  <span>My Account</span>
                </button>
              )}

              {/* Dropdown */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">
                  <a
                    href="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition"
                  >
                    Profile
                  </a>
                  <a
                    href="/myorders"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition"
                  >
                    Orders
                  </a>

                  {/* Divider */}
                  <div className="border-t border-gray-200 my-1"></div>

                  {/* Logout (distinct styling) */}
                  <button
                    onClick={() => {
                      logout();
                      setShowDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 text-red-600 font-medium hover:bg-red-50 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
    </>
  );
}
