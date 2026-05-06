import { useState } from "react";
import "./styles/LoginIn.css"
import { useNavigate } from "react-router-dom";
import { login } from "../utilities/Methods/UsersMethods";
const API_URL = import.meta.env.VITE_API_URL;

type LoginType = {
    name: string;
    email:string;
    password: string;
};

const LoginIn = () => {
    const [user, setUser] = useState<LoginType>({
        name: "",
        password: "",
        email: "",
    });

    const navigator = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user.name || !user.password || !user.email) {
            alert("Fill all fields");
            return;
        }

        try {
            const response = await login(user);

            if (!response.ok) {
                throw new Error();
            }

            const companiesResponse = await fetch(`${API_URL}/Authorization/MyCompanies`, {
                method: "GET",
                credentials: "include",
            });

            if (!companiesResponse.ok) {
                throw new Error("Failed to get companies");
            }

            const companies = await companiesResponse.json();

            if (!companies.length) {
                alert("No companies");
                return;
            }

            const firstCompany = companies[0];

            const companyTokenResponse = await fetch(
                `${API_URL}/Authorization/Refresh?companyId=${firstCompany.id}`,
                {
                    method: "POST",
                    credentials: "include",
                }
            );

            if (!companyTokenResponse.ok) {
                throw new Error("Failed to refresh token");
            }

            const companyAccessToken = await companyTokenResponse.text();

            if (!companyAccessToken) {
                throw new Error("No company token");
            }

            localStorage.setItem("isAuth", "true");
            localStorage.setItem("accessToken", companyAccessToken);
            localStorage.setItem("companyId", firstCompany.id.toString());
            localStorage.setItem(
                "user",
                JSON.stringify({
                    userName: user.name,
                    email: user.email,
                })
            );

            navigator(`/MainPage/MainContent/company/${firstCompany.id}`);
        } catch {
            alert("Incorrect login or password or email");
        }
    };
     const OnClickBack= () => {
                navigator("/")
        }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

  return (
    <div className="LoginIn_body">
     <form className="Login_Input" onSubmit={handleSubmit}>
            <h1 className="top">Login In</h1>
            <label className="lable">Login</label>
            <input
            className="input"
            type="text"
            name="name"
            placeholder="Write login friend"
            value={user.name}
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
            type="password"
            name="password"
            placeholder="Write password friend"
            value={user.password}
            onChange={handleChange}
            required
            />
            <button className="button" type="submit">Log in</button>
            <button className="Back_button" onClick={OnClickBack}>Back</button>
        </form>
        </div>
  );
};
export default LoginIn;