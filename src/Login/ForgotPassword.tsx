import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/ForgotPassword.css"

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [step, setStep] = useState(1); 

  const handleGetToken = async () => {
    try {
      const response = await fetch(
        `https://localhost:5001/ForgotPassword/GetToken${email}`,
        {
          method: "PUT"
        }
      );

      if (response.ok) {
        const data = await response.text();
        alert("Token: " + data); 
        setStep(2);
      } else {
        alert("Token Error");
      }
    } catch (e) {
      console.error(e);
      alert("Wire Error");
    }
  };

  const handleLoginWithToken = async () => {
    try {
      const response = await fetch(
        "https://localhost:5001/ForgotPassword/LoginWithToken",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include", 
          body: JSON.stringify({
            email: email,
            password: token 
          })
        }
      );

      if (response.ok) {
        navigate("/MainPage/MainContent");
      } else {
        alert("Error Token");
      }
    } catch (e) {
      console.error(e);
      alert("Wire Error");
    }
  };
  const OnClickBack= () => {
                navigate("/")
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
            placeholder="Write email friend"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="GetToken_button" onClick={handleGetToken}>
            Get Token
          </button>
           <button className="Back_button" onClick={OnClickBack}>Back</button>
        </>
      )}

      {step === 2 && (
        <>
        <label className="lable">Token</label>
          <input
          className="input"
            type="text"
            placeholder="Write token friend"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />

          <button className="WriteToken_button" onClick={handleLoginWithToken}>
           Log in with Token
          </button>
           <button className="Back_button" onClick={OnClickBack}>Back</button>
        </>
      )}
      </div>
    </div>
  );
}

export default ForgotPassword;