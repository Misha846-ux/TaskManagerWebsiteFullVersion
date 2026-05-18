import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../Styles/LoginPage/ForgotPassword.css";
import UserDataInput from "./UserDataInput";
import type { UserLogin, UserUpdate } from "../../../../Domain/User";
import {
  forgotPassword,
  loginWithRecoveryToken,
  getMyCompanies,
  refreshAccessToken,
} from "../../../../Infrastructure/ControllersMethods/AuthorizationControllerMethods";
import { changeIsAuthorize, setAccessToken, setCompanyId } from "../../../../Infrastructure/LocalStorageMethods";
import { getMe, updateMe } from "../../../../Infrastructure/ControllersMethods/UserControllerMethods";


const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1); 
  const [newpassword, setNewPassword] = useState<string>("");

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

  function onSecondStepClick(value: UserLogin): void {
    try{
      loginWithRecoveryToken(value).then(() => {
        getMyCompanies().then((data) => {
          refreshAccessToken(data[0].id).then((accesToken) => {
            setAccessToken(accesToken);
            setCompanyId(data[0].id);
            changeIsAuthorize();
            setStep(3);
          });
        });
      });
    }
    catch (e){
      alert(e);
    }
  }

  function onThirdStepClick(): void{
    getMe().then((me) => {
      let newUser: UserUpdate = {
        id: me.id,
        password: newpassword
      }

      updateMe(newUser).then(() => {
        navigate("/MainPage/MainContent");
      })
    })
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

      {step === 3 && (
        <>
        <label className="lable">New password</label>
          <input 
          className="input"
            type="Text"
            placeholder="password"
            value={newpassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <button className="GetToken_button" onClick={onThirdStepClick}>
            Update password
          </button>
        </>
      )}
      </div>
    </div>
  );
}

export default ForgotPassword;