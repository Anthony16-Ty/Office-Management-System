import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
    // Retrieve the user authentication status from a proper source
    const user = { loggedIn: false }; // Replace with the actual authentication check
    return user && user.loggedIn;
};

const ProtectedRoutes = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet /> : <Navigate to="/admindashboard" />;
};

export default ProtectedRoutes;
