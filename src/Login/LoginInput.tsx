
import { useState } from "react";
import "./styles/LoginInput.css"
import { useNavigate } from "react-router-dom";
import { signUp } from "../utilities/Methods/UsersMethods";
import type { UserType } from "../utilities/Types/UserType";

const LoginInput = () =>{
    const [user, setUser] = useState<UserType>({
        id:0,
        userName:"",
        password:"",
        email:"",
    });
    const navigator = useNavigate();
    const OnClick = async () => {
    if (!user.userName || !user.email || !user.password) {
        alert("Fill all fields");
        return;
    }

    const response = await signUp({
        name: user.userName,
        email: user.email,
        password: user.password
        });

    if (response.ok) {
        alert("Account created!");
        
        navigator("/LoginIn");
    } else {
        alert("Error");
    }
    };
    const OnClickLoginIn = () => {
                navigator("/LoginIn")
    }
    const OnClickForgotPassword = () => {
                navigator("/ForgotPassword")
    }
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        const {name, value} = e.target;
        setUser((prev)=>({
            ...prev,
            [name]:value,
        }));
    };
    const handleSubmit = (e:React.FormEvent) =>{
        e.preventDefault();
        console.log(user);
    };
    return(
        <form className="LoginInput" onSubmit={handleSubmit}>
            <h1 className="top">Sign In</h1>
            <label className="lable">Login</label>
            <input
            className="input"
            type="text"
            name="userName"
            placeholder="Write login friend"
            value={user.userName}
            onChange={handleChange}
            required
            />
             <label className="lable">Email</label>
            <input
            className="input"
            type="text"
            name="email"
            placeholder="Write email friend"
            value={user.email}
            onChange={handleChange}
            required
            />
            <label className="lable">Password</label>
            <input
            className="input"
            type="text"
            name="password"
            placeholder="Write password friend"
            value={user.password}
            onChange={handleChange}
            required
            />
            <button className="button" onClick={OnClick}>Sign Up</button>
            <label className="Litle_lable">
            <label className="Lable_Login">
                Already have account?
                <button className="Litle_button" onClick={OnClickLoginIn}>Log in</button>
                </label>
                <label className="Lable_Forgot_Password">
                Forgot password?
                <button className="Litle_button" onClick={OnClickForgotPassword}>Change</button>
                </label>
                </label>
        </form>
    );
};
export default LoginInput;