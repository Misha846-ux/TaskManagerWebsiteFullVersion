import "../../Styles/MainPage/MainPage.css"
import FourthLine from "./Components/FourthLine";
import SecondLine from "./Components/SecondLine";
import ThirdLine from "./Components/ThirdLine";
import Timer from "../MultiUsedParts/Timer";

const MainPage = () => {
    return (
        <div className="MainPage_rest">
            <div className="Block1"><Timer/></div>
            <SecondLine/>
            <ThirdLine/>
            <FourthLine/>
        </div>
    );
}

export default MainPage;