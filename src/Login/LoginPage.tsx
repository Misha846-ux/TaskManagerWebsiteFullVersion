import LoginImage from "./LoginImage";
import LoginInput from "./LoginInput";
import "./styles/LoginPage.css"

const LoginPage = () =>{
    return(
        <div className="LoginPage">
        <LoginImage></LoginImage>
        <LoginInput></LoginInput>
        </div>
    );
};

export default LoginPage;