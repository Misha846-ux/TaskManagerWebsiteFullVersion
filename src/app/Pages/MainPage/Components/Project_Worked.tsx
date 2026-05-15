import { useEffect, useState } from "react";
import "../../../Styles/MainPage/Project_Worked.css";
import { getProjectsByCompanyId } from "../../../../Infrastructure/ControllersMethods/ProjectsControllerMethods";
import { getCompanyId } from "../../../../Infrastructure/LocalStorageMethods";
const Project_Worked:React.FC = () =>{
    const [projectsCount, setProjectsCount] = useState<number>(0);
    
    window.addEventListener("ProjectAdd", () => {
        getProjectsByCompanyId(getCompanyId()).then((data) => {
            setProjectsCount(data.length);
        });
    })

    useEffect(() => {
        getProjectsByCompanyId(getCompanyId()).then((data) => {
            setProjectsCount(data.length);
        });
    }, []);
    return(
        <div className="Project_Worked">
            <div className="Project_Worked_text">Project Worked</div>
            <div className="Project_Worked_fill">
            <div className="Counter"><b>{projectsCount}</b></div>
            <button className="File_button"></button>
            </div>
        </div>
    );
};
export default Project_Worked;