import { Navigate, Outlet } from "react-router-dom";

const useAuth = ({isloggedIn}) => {
    // Retrieve the user authentication status from a proper source
    const user = { isloggedIn: false }; // Replace with the actual authentication check
    return user && user.isloggedIn;
};

const ProtectedRoutes = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
