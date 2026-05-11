import "../../../Styles/LoginPage/UserDataInput.css";
import type { UserLogin } from "../../../../Domain/User";

type Props = {
    title: string;
    onFormButtonClick: (value: UserLogin) => void;
};


const UserDataInput = ({title, onFormButtonClick}: Props ) =>{

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const user: UserLogin = {
            UserName: formData.get("UserName") as string,
            Email: formData.get("Email") as string,
            Password: formData.get("Password") as string,
        };

        if (!user.UserName || !user.Email || !user.Password) {
            alert("Fill all fields");
            return;
        }

        onFormButtonClick(user);
    };


    return(
        <form className="LoginInput" onSubmit={handleSubmit}>
            <h1 className="top">{title}</h1>
            <label className="lable">Login</label>
            <input
            className="input"
            type="text"
            name="userName"
            placeholder="Login"
            required
            />
             <label className="lable">Email</label>
            <input
            className="input"
            type="text"
            name="email"
            placeholder="Email"
            required
            />
            <label className="lable">Password</label>
            <input
            className="input"
            type="password"
            name="password"
            placeholder="Password"
            required
            />
            <button className="button" type="submit">{title}</button>  
        </form>
    );
};
export default UserDataInput;