'use client';

import React, { createContext, useReducer, useContext, ReactNode, useEffect } from 'react';
import type { MenuItem } from '@/lib/data';

export type CartItem = MenuItem & { quantity: number };

type CartState = {
  items: CartItem[];
  isCartOpen: boolean;
};

type CartAction =
  | { type: 'ADD_TO_CART'; payload: MenuItem }
  | { type: 'REMOVE_FROM_CART'; payload: { id: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id:string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_CART_OPEN', payload: boolean };

const initialState: CartState = {
  items: [],
  isCartOpen: false,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingItemIndex > -1) {
        const newItems = [...state.items];
        newItems[existingItemIndex].quantity += 1;
        return { ...state, items: newItems };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    case 'UPDATE_QUANTITY': {
        if (action.payload.quantity <= 0) {
            return {
                ...state,
                items: state.items.filter((item) => item.id !== action.payload.id),
            };
        }
        return {
            ...state,
            items: state.items.map((item) =>
            item.id === action.payload.id
                ? { ...item, quantity: action.payload.quantity }
                : item
            ),
        };
    }
    case 'CLEAR_CART':
        return { ...state, items: [] };
    case 'SET_CART_OPEN':
        return { ...state, isCartOpen: action.payload };
    default:
      return state;
  }
}

interface CartContextType {
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
    isCartOpen: boolean;
    addToCart: (item: MenuItem) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    setCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const value = {
    items: state.items,
    totalItems,
    totalPrice,
    isCartOpen: state.isCartOpen,
    addToCart: (item: MenuItem) => dispatch({ type: 'ADD_TO_CART', payload: item }),
    removeFromCart: (id: string) => dispatch({ type: 'REMOVE_FROM_CART', payload: { id } }),
    updateQuantity: (id: string, quantity: number) => dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } }),
    clearCart: () => dispatch({ type: 'CLEAR_CART' }),
    setCartOpen: (isOpen: boolean) => dispatch({ type: 'SET_CART_OPEN', payload: isOpen }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
