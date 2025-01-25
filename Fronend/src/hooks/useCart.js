import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const useCart = () => {
    const { cart, addToCart, removeFromCart, clearCart, calculateTotal } =
        useContext(CartContext);

    const cartItemCount = () =>
        cart.reduce((total, item) => total + item.quantity, 0);

    return { cart, addToCart, removeFromCart, clearCart, calculateTotal, cartItemCount };
};

export default useCart;
