import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product, CartItem } from '../types';

interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  addToCart: (product: Product, quantity: number, size: string, color: string) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, newQuantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: Product, quantity: number, size: string, color: string) => {
    const compositeId = `${product.id}-${size}-${color}`;
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === compositeId);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === compositeId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        const newCartItem: CartItem = { id: compositeId, product, quantity, selectedSize: size, selectedColor: color };
        return [...prevItems, newCartItem];
      }
    });
    if (!isCartOpen) {
      setIsCartOpen(true);
    }
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };
  
  const clearCart = () => {
    setCartItems([]);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };
  
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, isCartOpen, addToCart, removeFromCart, updateQuantity, clearCart, toggleCart, getCartTotal, getCartItemCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
