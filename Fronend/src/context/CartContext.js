import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (item) => {
        setCart((prevCart) => {
            const exists = prevCart.find((cartItem) => cartItem.id === item.id);
            if (exists) {
                return prevCart.map((cartItem) =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            } else {
                return [...prevCart, { ...item, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (id) =>
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));

    const clearCart = () => setCart([]);

    const calculateTotal = () =>
        cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <CartContext.Provider
            value={{ cart, addToCart, removeFromCart, clearCart, calculateTotal }}
        >
            {children}
        </CartContext.Provider>
    );
};
