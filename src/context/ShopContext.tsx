import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  shippingAddress: {
    fullName: string;
    email: string;
    address: string;
    city: string;
    phone: string;
  };
  paymentMethod: string;
  status: 'Processing' | 'Shipped' | 'Delivered';
}

interface ShopContextType {
  cart: CartItem[];
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartSubtotal: number;
  cartTax: number;
  cartShipping: number;
  cartCount: number;
  // Login flow
  isLoggedIn: boolean;
  userEmail: string | null;
  loginUser: (email: string) => void;
  logoutUser: () => void;
  // Orders history
  orders: Order[];
  placeOrder: (shippingAddress: {
    fullName: string;
    email: string;
    address: string;
    city: string;
    phone: string;
  }, paymentMethod: string) => Order;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('hamro_theme');
    return (saved as 'light' | 'dark') || 'light';
  });

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('hamro_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // User Auth state
  const [userEmail, setUserEmail] = useState<string | null>(() => {
    return localStorage.getItem('hamro_user_email');
  });

  // Orders state
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('hamro_orders');
    return saved ? JSON.parse(saved) : [];
  });

  // Sync theme to root class
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('hamro_theme', theme);
  }, [theme]);

  // Sync cart to local storage
  useEffect(() => {
    localStorage.setItem('hamro_cart', JSON.stringify(cart));
  }, [cart]);

  // Sync user to local storage
  useEffect(() => {
    if (userEmail) {
      localStorage.setItem('hamro_user_email', userEmail);
    } else {
      localStorage.removeItem('hamro_user_email');
    }
  }, [userEmail]);

  // Sync orders to local storage
  useEffect(() => {
    localStorage.setItem('hamro_orders', JSON.stringify(orders));
  }, [orders]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const loginUser = (email: string) => {
    setUserEmail(email);
  };

  const logoutUser = () => {
    setUserEmail(null);
  };

  const placeOrder = (
    shippingAddress: {
      fullName: string;
      email: string;
      address: string;
      city: string;
      phone: string;
    },
    paymentMethod: string
  ): Order => {
    const newOrder: Order = {
      id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toISOString().split('T')[0],
      items: [...cart],
      total: cartTotal,
      shippingAddress,
      paymentMethod,
      status: 'Processing'
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCart([]); // Reset cart after placing order
    return newOrder;
  };

  // Computations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartTax = cartSubtotal * 0.13; // 13% VAT standard in Nepal or typical standard VAT
  const cartShipping = cartSubtotal > 300 ? 0 : (cartSubtotal === 0 ? 0 : 15.00); // Free shipping above $300
  const cartTotal = cartSubtotal + cartTax + cartShipping;
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <ShopContext.Provider
      value={{
        cart,
        theme,
        toggleTheme,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartSubtotal,
        cartTax,
        cartShipping,
        cartTotal,
        cartCount,
        isLoggedIn: !!userEmail,
        userEmail,
        loginUser,
        logoutUser,
        orders,
        placeOrder
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}
