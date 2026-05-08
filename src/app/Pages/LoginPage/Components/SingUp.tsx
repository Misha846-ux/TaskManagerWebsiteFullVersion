import { useNavigate } from "react-router-dom";
import "../../../Styles/LoginPage/LoginInput.css"
import type { UserLogin, UserPost } from "../../../../Domain/User";
import type { CompanyGet } from "../../../../Domain/Company";
import UserDataInput from "./UserDataInput";
import { login, getMyCompanies, refreshAccessToken, signUp } from "../../../../Infrastructure/ControllersMethods/AuthorizationControllerMethods";
import { changeIsAuthorize, setAccessToken, setCompanyId } from "../../../../Infrastructure/LocalStorageMethods";

const SingUp = async () => {
    const navigator = useNavigate();

    async function OnFormClick(value: UserLogin): Promise<void>{
        try{
            let userCreate: UserPost = {
                UserName: value.UserName,
                Email: value.Email,
                Password: value.Password,
                Settings: ""
            }

            if(!await signUp(userCreate)){
                throw Error("Auth Error");
            }
            if(await login(value)){
                let data: CompanyGet[] = await getMyCompanies();
                let accesToken: string = await refreshAccessToken(data[0].Id);
                setAccessToken(accesToken);
                setCompanyId(data[0].Id);
                changeIsAuthorize();

                navigator("/MainPage/MainContent")
            }
            else{
                throw Error("Auth Error");
            }
        }
        catch{
            alert("Oh no error" )
        }
    }

  return (
    <div className="LoginIn_body"> 
        <UserDataInput title="SingUp" onFormButtonClick={OnFormClick}></UserDataInput>
    </div>
  );
};
export default SingUp;