import "../../Styles/ProjectPage/ProjectPage.css"
import Timer from "../MultiUsedParts/Timer";
import FirstColumm from "./Components/FirstColumm";
import SecondColumm from "./Components/SecondColumm";

const ProjectPage = () => {
    return (
        <div className="ProjectPage">
            <div className="FirstLine">
                <Timer/>
            </div>
            <div className="SecondLine">
                <FirstColumm/>
                <SecondColumm/>
            </div>
        </div>
    );
}

export default ProjectPage;