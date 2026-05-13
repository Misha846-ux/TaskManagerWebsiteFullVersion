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
            userName: formData.get("userName") as string,
            email: formData.get("email") as string,
            password: formData.get("password") as string,
        };

        if (!user.userName || !user.email || !user.password) {
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