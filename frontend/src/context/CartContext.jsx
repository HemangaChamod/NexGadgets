import React, { createContext, useReducer } from "react";

export const CartContext = createContext();

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
};

const reducer = (state, action) => {
  let cartItems;

  switch (action.type) {
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

      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cartItems };

    case "REMOVE_ITEM":
      cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cartItems };

    case "CLEAR_CART":
      localStorage.removeItem("cartItems");
      return { ...state, cartItems: [] };

    case "INCREMENT_QTY":
      cartItems = state.cartItems.map((x) =>
        x._id === action.payload ? { ...x, qty: (x.qty || 1) + 1 } : x
      );
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cartItems };

    case "DECREMENT_QTY":
      cartItems = state.cartItems.map((x) =>
        x._id === action.payload
          ? { ...x, qty: Math.max((x.qty || 1) - 1, 1) }
          : x
      );
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cartItems };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
