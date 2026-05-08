import Login_photo from"../../../Images/Login_photo.png";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../Styles/LoginPage/LoginBackground.css"
import "../../Styles/LoginPage/LoginImage.css"
import "../../Styles/LoginPage/LoginPage.css"
import "../../../Styles/LoginPage/LoginInput.css"
import { getIsAuthorize } from "../../../Infrastructure/LocalStorageMethods";



const LoginPage = () =>{
    let [isSingUp, ChangeIsSingUp] = useState<Boolean>(false);
    let [isForgot, ChangeIsForgot] = useState<Boolean>(false);
    const navigator = useNavigate()
        useEffect(() => {
        try {
            const user: Boolean = getIsAuthorize();
            if (user) {
                navigator("/MainPage/MainContent");
            }
        } catch {}
    }, []);
    
    const OnClickLoginIn = () => {
        if(!isSingUp){
            ChangeIsSingUp(true);
            ChangeIsForgot(false);
            navigator("/SingUp");
        }
        else{
            ChangeIsSingUp(false);
            navigator("/");
        }
        
    }
    const OnClickForgotPassword = () => {
        if(!isForgot){
            ChangeIsForgot(true);
            ChangeIsSingUp(false);
            navigator("/ForgotPassword");
        }
        else{
            ChangeIsForgot(false);
            navigator("/");
        }
        
    }

    // Outlet здесь фактически это просто то какая компонента для воода данных будет использована.
    //And yes, the main page is simply registration. 
    // To create an account, you need to select this option.
    return(
        <div className="LoginBackground">
            LoginPage
            <div className="LoginPage">
                <img className="LoginImage" src={Login_photo}></img>
                <div>
                    <Outlet></Outlet>
                    <label className="Litle_lable">
                        <label className="Lable_Login">
                            {!isSingUp? "Have no account?" : "Already have account?"} 
                            <button className="Litle_button" onClick={OnClickLoginIn}>
                                {!isSingUp? "SingUp" : "Login"}
                            </button>
                        </label>

                        <label className="Lable_Forgot_Password">
                            {!isForgot? "Forgot password?" : "Remembered the password?"}
                            <button className="Litle_button" onClick={OnClickForgotPassword}>
                                {!isForgot? "Change" : "Login"}
                            </button>
                        </label>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;