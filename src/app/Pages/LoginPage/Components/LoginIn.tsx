import { useNavigate } from "react-router-dom";
import "../../../Styles/LoginPage/LoginIn.css";
import type { UserLogin } from "../../../../Domain/User";
import UserDataInput from "./UserDataInput";
import { login, getMyCompanies, refreshAccessToken } from "../../../../Infrastructure/ControllersMethods/AuthorizationControllerMethods";
import { changeIsAuthorize, setAccessToken, setCompanyId } from "../../../../Infrastructure/LocalStorageMethods";

const LoginIn = () => {
    const navigator = useNavigate();

    function OnFormClick(value: UserLogin): void{
        try{
            login(value).then(() => {
                getMyCompanies().then((data) => {
                    console.log(data);
                    console.log(data[0].id);
                    refreshAccessToken(data[0].id).then((accesToken) => {
                        setAccessToken(accesToken);
                        setCompanyId(data[0].id);
                        changeIsAuthorize();
                        navigator("/MainPage/MainContent")
                    });
                });
            });
        }
        catch{
            alert("Oh no error")
        }
    }

  return (
    <div className="LoginIn_body"> 
        <UserDataInput title="Login" onFormButtonClick={OnFormClick}></UserDataInput>
    </div>
  );
};
export default LoginIn;