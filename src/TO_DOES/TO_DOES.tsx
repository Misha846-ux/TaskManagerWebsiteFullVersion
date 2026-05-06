import { useEffect, useState } from "react";
import type { ProjectType } from "../utilities/Types/ProjectType";
import "./styles/TO_DOES.css";
import { GetProjects } from "../utilities/Methods/ProjectMethods";
const TO_DOES = () => {
    const [projects, SetProjects] = useState<ProjectType[]>([]);
    useEffect(() => {
   const companyId = localStorage.getItem("companyId");

   if (!companyId) return;

   GetProjects(Number(companyId)).then((value) => {
      SetProjects(value);
   });
}, []);  

    return(
    <div className="TO_DOES_background">
        <div className="TO_DOES_top">To Do</div>
        <div className="TO_DOES_content">
        <div className="TO_DOES_Scroll_top">
            <div>To Does</div>
            <div className="TO_DOES_Scroll_top_name">Percent</div>
        </div>
        <div className="TO_DOES_Project_content">
            {projects.map((item) => (<div className="TO_DOES_Project" key={item.title}>
                <button className="TO_DOES_Project_button"></button>
                <div className="TO_DOES_Project_name"><b>{item.title}</b></div>
                <div className="TO_DOES_Project_percent">{Math.round((item.tasksDone / item.totalTasks) * 100)}%</div>
                <div className="TO_DOES_Project_percent_background_line">
                    <div className="TO_DOES_Project_percent_line" style={{"--percent": `${Math.round((item.tasksDone / item.totalTasks) * 100)}%`} as React.CSSProperties}></div>
                </div>
            </div>))}
        </div>
        </div>
    </div>
);
};
export default TO_DOES;