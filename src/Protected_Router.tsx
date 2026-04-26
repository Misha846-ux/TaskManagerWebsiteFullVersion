import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function ProtectedRoute() {
const isAuth = localStorage.getItem("isAuth") === "true";

return isAuth ? <Outlet/> : <Navigate to="/" />;
}