import { useNavigate } from 'react-router-dom';
import CompaniesBox from './Components/CompaniesBox.tsx';
import '../../Styles/GeneralComponentsStyles/SideBar/SideBar.css';
import img from "../../../Images/logo.png";

const SideBar = () => {
  const navigator = useNavigate();

  const OnClick = () => {
    localStorage.clear();
    navigator('/');
  };

  return (
    <div className="sidebar">
      <div className="Logo_div">
        <img className="Logo_img" src={img} alt="Logo" />
      </div>
      <h1 className="sidebar_top">Your Companies</h1>
      <CompaniesBox/>
      <button className="LogOut_button" onClick={OnClick}>
        <b>LogOut</b>
      </button>
    </div>
  );
}

export default SideBar;