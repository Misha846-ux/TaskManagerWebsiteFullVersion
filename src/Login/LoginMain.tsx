import { Outlet, useNavigate } from "react-router-dom";
import LoginBackground from "./LoginBackground";
import "./styles/LoginMain.css";
import { useEffect } from "react";
const LoginMain = () =>{
    const navigator = useNavigate()
    useEffect(() => {
    try {
        const user = JSON.parse(localStorage.getItem("user") || "null");
        if (user) {
            navigator("/MainPage/MainContent");
        }
    } catch {}
}, []);

    return(
        <div className="LoginMain">
        <LoginBackground/>
        <Outlet></Outlet>
        </div>
    );
};
export default LoginMain;