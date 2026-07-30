"use client";
import {
  createContext,
  useContext,
  useState,
} from "react";

const CartContext = createContext();

export function CartProvider({
  children,
}) {
  const [cartItemsId, setCartItemsId] =
    useState([]);

  return (
    <CartContext.Provider
      value={{
        cartItems: cartItemsId,
        setCartItems: setCartItemsId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(
    CartContext,
  );
  if (!context) {
    throw new Error(
      "useCart must be used within a Cartprovider",
    );
  }
  return context;
}
