import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

const useProduct = () => {
    const { products, addProduct, removeProduct, updateProduct, loading } =
        useContext(ProductContext);

    const findProductById = (id) =>
        products.find((product) => product.id === id) || null;

    return { products, addProduct, removeProduct, updateProduct, loading, findProductById };
};

export default useProduct;
