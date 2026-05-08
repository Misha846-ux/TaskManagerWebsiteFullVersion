import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../Styles/LoginPage/ForgotPassword.css"
import UserDataInput from "./UserDataInput";
import type { UserLogin } from "../../../../Domain/User";
import 
{ forgotPassword, loginWithRecoveryToken, 
  getMyCompanies, refreshAccessToken } 
from "../../../../Infrastructure/ControllersMethods/AuthorizationControllerMethods";
import { changeIsAuthorize, setAccessToken, setCompanyId } 
from "../../../../Infrastructure/LocalStorageMethods";
import type { CompanyGet } from "../../../../Domain/Company";


const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1); 

  const handleGetToken = async () => {
    try {
      await forgotPassword(email);
      setStep(2);
    } 
    catch (e) {
      console.error(e);
      alert("Wire Error");
    }
  };

  async function onSecondStepClick(value: UserLogin): Promise<void> {
    try{
      if(await loginWithRecoveryToken(value)){
        let data: CompanyGet[] = await getMyCompanies();
        let accesToken: string = await refreshAccessToken(data[0].Id);
        setAccessToken(accesToken);
        setCompanyId(data[0].Id);
        changeIsAuthorize();
        navigate("/MainPage/MainContent")
      }
    }
    catch (e){
      alert(e);
    }
  }

  return (
    <div className="ForgotPassword_body">
        <div className="ForgotPassword_content">
      <h2 className="top">Recreate password</h2>

      {step === 1 && (
        <>
        <label className="lable">Email</label>
          <input 
          className="input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="GetToken_button" onClick={handleGetToken}>
            Get Token
          </button>
        </>
      )}

      {step === 2 && (
        <UserDataInput title="Login With RecoveryToken" onFormButtonClick={onSecondStepClick}></UserDataInput>
      )}
      </div>
    </div>
  );
}

export default ForgotPassword;