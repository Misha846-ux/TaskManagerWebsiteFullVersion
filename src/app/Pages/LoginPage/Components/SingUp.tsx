import { useNavigate } from "react-router-dom";
import "../../../Styles/LoginPage/SingUp.css";
import type { UserLogin, UserPost } from "../../../../Domain/User";
import UserDataInput from "./UserDataInput";
import { login, getMyCompanies, refreshAccessToken, signUp } from "../../../../Infrastructure/ControllersMethods/AuthorizationControllerMethods";
import { changeIsAuthorize, setAccessToken, setCompanyId } from "../../../../Infrastructure/LocalStorageMethods";

const SingUp = () => {
    const navigator = useNavigate();

    function OnFormClick(value: UserLogin): void{
        try{
            let userCreate: UserPost = {
                UserName: value.UserName,
                Email: value.Email,
                Password: value.Password,
                Settings: ""
            }

            signUp(userCreate).then(() => {
                login(value).then(() => {
                    getMyCompanies().then((data) => {
                        refreshAccessToken(data[0].Id).then((accesToken) => {
                            setAccessToken(accesToken);
                            setCompanyId(data[0].Id);
                            changeIsAuthorize();
                            navigator("/MainPage/MainContent")
                        });
                    });
                });
            });
        }
        catch{
            alert("Oh no error" )
        }
    }

  return (
    <div className="SingUp_body"> 
        <UserDataInput title="SingUp" onFormButtonClick={OnFormClick}></UserDataInput>
    </div>
  );
};
export default SingUp;