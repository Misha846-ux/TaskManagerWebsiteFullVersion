import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
    const isAuth = localStorage.getItem("isAuth");

    return isAuth ? <Outlet /> : <Navigate to="/" />;
}