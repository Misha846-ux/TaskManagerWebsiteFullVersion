import { useDispatch } from "react-redux";
import { setQuery } from "../../../Infrastructure/redux/reducers/SearchLineReduser";
import Dashboard from "./Components/Dashboard.tsx";
import Search from "./Components/Search.tsx";
import Bell from "./Components/Bell.tsx";
import Profile from "./Components/Profile.tsx";
import "../../Styles/GeneralComponentsStyles/Header/Header.css";

type HeaderProps = {
    sideBareButtonClick: () => void;
};

const Header: React.FC<HeaderProps> = ({ sideBareButtonClick }) => {
    const dispatch = useDispatch();

    const onSearch = (value: string) => {
        dispatch(setQuery(value));
    };

    return (
        <div  className="Header">
            <Dashboard sideBareButtonClick={sideBareButtonClick} />
            <Search onSearch={onSearch} />
            <Bell />
            <Profile />
        </div>
    );
};

export default Header;
