import { NavLink } from "react-router-dom";
import "../../../Styles/GeneralComponentsStyles/Header/Dashboard.css";

type DashboardProps = {
    sideBareButtonClick: () => void;
};

const Dashboard: React.FC<DashboardProps> = ({ sideBareButtonClick }) => {
    return (
        <>
            <button type="button" onClick={sideBareButtonClick} className="dash_button"></button>
            <NavLink to="/MainPage/MainContent" className="dashboard">
                <b>TaskWebSite</b>
            </NavLink>
        </>
    );
};

export default Dashboard;
