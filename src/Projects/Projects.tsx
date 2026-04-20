import { useEffect, useState } from "react";
import "./styles/Projects.css";
import { GetProjects } from "../utilities/Methods/GetProjectsFunc";
import type { ProjectType } from "../utilities/Types/ProjectType";
import { useSelector, type TypedUseSelectorHook } from "react-redux";
import type { RootState } from "../redux/store";
import { NavLink } from "react-router-dom";
const Projects = () =>{
    const [projects, SetProjects] = useState<ProjectType[]>([]);
    const query = useSelector((state: RootState) => state.search.query)
        useEffect(()=>{
            GetProjects().then((value) => {
                SetProjects(value);
                
            })
        },[])
    return (
        <div className="Projects">
            <div className="Projects_background">
                <div className="Projects_top">Projects</div>
                <div className="Project_content">
                   {projects.filter((item) => {
                    if(query == ""){
                        return true;
                    }
                    else{
                        const regex = new RegExp(query, "i");
                        return regex.test(item.title);
                    }
                   }).map((item) => (<NavLink to={`/MainPage/TaskContent/${item.id}`} className="TO_DOES_Project" key={item.id}>
                <button className="TO_DOES_Project_button"></button>
                <div className="TO_DOES_Project_name"><b>{item.title}</b></div>
                <div className="TO_DOES_Project_percent">{Math.round((item.tasksDone / item.totalTasks) * 100)}%</div>
                <div className="TO_DOES_Project_percent_background_line">
                    <div className="TO_DOES_Project_percent_line" style={{"--percent": `${Math.round((item.tasksDone / item.totalTasks) * 100)}%`} as React.CSSProperties}></div>
                </div>
            </NavLink>))}
                </div>
            </div>
        </div>
    );
};
export default Projects;