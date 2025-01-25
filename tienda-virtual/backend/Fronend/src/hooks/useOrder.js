import { useContext } from "react";
import { OrderContext } from "../context/OrderContext";

const useOrder = () => {
    const { orders, placeOrder, cancelOrder, getOrderById, loading } =
        useContext(OrderContext);

    return { orders, placeOrder, cancelOrder, getOrderById, loading };
};

export default useOrder;
