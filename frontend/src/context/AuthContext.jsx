import React, { createContext, useState, useEffect, useContext } from "react";
import API from "../axiosConfig";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // FIXED

  // Load user from localStorage on first render
  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      setUser(null);
    }
    setLoading(false); // FINALLY done loading
  }, []);

  // Save user whenever updated
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const register = async (name, email, password) => {
    setLoading(true);
    try {
      const { data } = await API.post("/users/register", { name, email, password });

      if (!data || !data.token) throw new Error("Server did not return auth token");

      setUser(data);
      return true;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const { data } = await API.post("/users/login", { email, password });

      if (!data || !data.token) throw new Error("Invalid login response");

      setUser(data);
      return true;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
