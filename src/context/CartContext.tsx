import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { Book } from "@/lib/books-data";

export interface CartItem {
  book: Book;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: Book }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" };

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.book.price * item.quantity, 0);
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find(
        (item) => item.book.id === action.payload.id
      );
      if (existingItem) {
        const updatedItems = state.items.map((item) =>
          item.book.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return { items: updatedItems, total: calculateTotal(updatedItems) };
      }
      const newItems = [...state.items, { book: action.payload, quantity: 1 }];
      return { items: newItems, total: calculateTotal(newItems) };
    }
    case "REMOVE_ITEM": {
      const filteredItems = state.items.filter(
        (item) => item.book.id !== action.payload
      );
      return { items: filteredItems, total: calculateTotal(filteredItems) };
    }
    case "UPDATE_QUANTITY": {
      if (action.payload.quantity <= 0) {
        const filteredItems = state.items.filter(
          (item) => item.book.id !== action.payload.id
        );
        return { items: filteredItems, total: calculateTotal(filteredItems) };
      }
      const updatedItems = state.items.map((item) =>
        item.book.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      return { items: updatedItems, total: calculateTotal(updatedItems) };
    }
    case "CLEAR_CART":
      return { items: [], total: 0 };
    default:
      return state;
  }
};

interface CartContextType {
  items: CartItem[];
  total: number;
  itemCount: number;
  addItem: (book: Book) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

  const addItem = (book: Book) => dispatch({ type: "ADD_ITEM", payload: book });
  const removeItem = (id: string) => dispatch({ type: "REMOVE_ITEM", payload: id });
  const updateQuantity = (id: string, quantity: number) =>
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        total: state.total,
        itemCount,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
