import React, { createContext, useState, useEffect, useContext } from "react";
import API from "../axiosConfig";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch (e) {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        localStorage.removeItem("user");
      }
    } catch {}
  }, [user]);

  // Register user
  const register = async (name, email, password) => {
    setLoading(true);
    try {
      const { data } = await API.post("/users/register", { name, email, password });

      if (!data || !data.token) {
        throw new Error("Server did not return auth token");
      }

      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));

      return true;
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed";
      console.error("Registration error:", msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (email, password) => {
    setLoading(true);
    try {
      const { data } = await API.post("/users/login", { email, password });

      if (!data || !data.token) {
        throw new Error("Invalid login response");
      }

      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));

      return true;
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
      console.error("Login error:", msg);
      throw new Error(msg);
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
