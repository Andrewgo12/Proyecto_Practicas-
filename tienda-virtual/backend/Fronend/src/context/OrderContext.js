import React, { createContext, useState } from "react";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    const placeOrder = (order) => {
        setLoading(true);
        setTimeout(() => {
            setOrders((prevOrders) => [...prevOrders, order]);
            setLoading(false);
        }, 1000);
    };

    const cancelOrder = (id) => {
        setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
    };

    const getOrderById = (id) => orders.find((order) => order.id === id);

    return (
        <OrderContext.Provider
            value={{ orders, placeOrder, cancelOrder, getOrderById, loading }}
        >
            {children}
        </OrderContext.Provider>
    );
};
