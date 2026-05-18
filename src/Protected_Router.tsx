import { Navigate, Outlet } from "react-router-dom";
import { getIsAuthorize } from "./Infrastructure/LocalStorageMethods";

export default function ProtectedRoute() {
const isAuth = getIsAuthorize();

return isAuth ? <Outlet/> : <Navigate to="/" />;
}