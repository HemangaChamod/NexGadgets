import React, { createContext, useReducer, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";

export const CartContext = createContext();

const getCartKey = (user) => (user ? `cart_${user._id}` : null);

const getStoredCart = (user) => {
  if (!user) return [];
  return JSON.parse(localStorage.getItem(getCartKey(user))) || [];
};

const saveCart = (user, cartItems) => {
  if (!user) return;
  localStorage.setItem(getCartKey(user), JSON.stringify(cartItems));
};

const reducer = (state, action) => {
  const { user } = action;
  let cartItems;

  // Block all cart operations for guests
  if (!user && action.type !== "INIT_USER_CART") {
    toast.error("Please log in to add items to your cart.");
    return state;
  }

  switch (action.type) {
    case "INIT_USER_CART":
      return { cartItems: getStoredCart(user) };

    case "ADD_ITEM":
      const item = action.payload;
      const exist = state.cartItems.find((x) => x._id === item._id);

      if (exist) {
        cartItems = state.cartItems.map((x) =>
          x._id === item._id ? item : x
        );
      } else {
        cartItems = [...state.cartItems, item];
      }

      saveCart(user, cartItems);
      return { cartItems };

    case "REMOVE_ITEM":
      cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      saveCart(user, cartItems);
      return { cartItems };

    case "CLEAR_CART":
      localStorage.removeItem(getCartKey(user));
      return { cartItems: [] };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

  const [state, dispatch] = useReducer(reducer, {
    cartItems: getStoredCart(user),
  });

  useEffect(() => {
    dispatch({ type: "INIT_USER_CART", user });
  }, [user]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
