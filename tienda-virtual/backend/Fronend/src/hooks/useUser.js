import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const useUser = () => {
    const { user, login, logout, loading } = useContext(UserContext);

    const isAuthenticated = () => !!user;

    return { user, login, logout, loading, isAuthenticated };
};

export default useUser;
