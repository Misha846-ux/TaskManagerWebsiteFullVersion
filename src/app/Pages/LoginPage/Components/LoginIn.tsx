import { useNavigate } from "react-router-dom";
import "../../../Styles/LoginPage/LoginInput.css"
import type { UserLogin } from "../../../../Domain/User";
import type { CompanyGet } from "../../../../Domain/Company";
import UserDataInput from "./UserDataInput";
import { login, getMyCompanies, refreshAccessToken } from "../../../../Infrastructure/ControllersMethods/AuthorizationControllerMethods";
import { changeIsAuthorize, setAccessToken, setCompanyId } from "../../../../Infrastructure/LocalStorageMethods";

const LoginIn = async () => {
    const navigator = useNavigate();

    async function OnFormClick(value: UserLogin): Promise<void>{
        try{
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