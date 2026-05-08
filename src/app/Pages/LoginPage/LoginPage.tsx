import Login_photo from "../../../Images/Login_photo.png";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../Styles/LoginPage/LoginPage.css";
import { getIsAuthorize } from "../../../Infrastructure/LocalStorageMethods";

const LoginPage = () => {
    const [isSingUp, ChangeIsSingUp] = useState<Boolean>(false);
    const [isForgot, ChangeIsForgot] = useState<Boolean>(false);

    const navigator = useNavigate();
    useEffect(() => {
        try {
            const user: Boolean = getIsAuthorize();
            if (user) {
                navigator("/MainPage/MainContent");
            }
        } catch {}
    }, []);

    const OnClickLoginIn = () => {
        if (!isSingUp) {
            ChangeIsSingUp(true);
            ChangeIsForgot(false);
            navigator("/SingUp");
        } else {
            ChangeIsSingUp(false);
            navigator("/");
        }
    };

    const OnClickForgotPassword = () => {
        if (!isForgot) {
            ChangeIsForgot(true);
            ChangeIsSingUp(false);
            navigator("/ForgotPassword");
        } else {
            ChangeIsForgot(false);
            navigator("/");
        }
    };

    return (
        <div className="LoginBackground">
            <div className="LoginPage">
                <div className="LoginPage__imageBlock">
                    <img className="LoginImage" src={Login_photo} alt="Login illustration" />
                </div>

                <div className="LoginPage__contentBlock">
                    <div className="LoginPage__formArea">
                        <Outlet />
                    </div>

                    <div className="LoginPage__footerActions">
                        <div className="Litle_lable">
                            <div className="Lable_Login">
                                {!isSingUp ? "Have no account?" : "Already have account?"}
                                <button className="Litle_button" onClick={OnClickLoginIn}>
                                    {!isSingUp ? "SingUp" : "Login"}
                                </button>
                            </div>

                            <div className="Lable_Forgot_Password">
                                {!isForgot ? "Forgot password?" : "Remembered the password?"}
                                <button className="Litle_button" onClick={OnClickForgotPassword}>
                                    {!isForgot ? "Change" : "Login"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;