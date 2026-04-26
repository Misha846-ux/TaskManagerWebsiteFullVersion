import { useEffect, useState } from "react";
import "./styles/Projects.css";
import { GetProjects } from "../utilities/Methods/ProjectMethods";
import type { ProjectType } from "../utilities/Types/ProjectType";
import { useSelector, type TypedUseSelectorHook } from "react-redux";
import type { RootState } from "../redux/store";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;
const Projects = () =>{
    const [projects, SetProjects] = useState<ProjectType[]>([]);
    const query = useSelector((state: RootState) => state.search.query);
    const { companyId } = useParams();
        useEffect(()=>{
                GetProjects().then((value) => {
                    SetProjects(Array.isArray(value) ? value : []);
                })
                .catch(() => {
                    SetProjects([]);
                });
            },[companyId]);
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    const [newProject, setNewProject] = useState({
      title: ""
    });
    
    const handleOnChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
      const {name, value} = e.target;
    
      setNewProject(prev =>({
        ...prev,
        [name]:value
      }));
    };
    const onHandleSubmit = async (e:React.FormEvent) =>{
      e.preventDefault();
      
      const companyId = Number(localStorage.getItem("companyId"));

      const response = await fetch(`${API_URL}/projects/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
             Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        },
        body: JSON.stringify({
            title: newProject.title,
            companyId: companyId
        }),
    });
    
      if (!response.ok) {
  const text = await response.text();
  throw new Error(`Error ${response.status}: ${text}`);
}
    
      
    
     await GetProjects().then((value) => {
  SetProjects(Array.isArray(value) ? value : []);
    });
    
      setIsCreateOpen(false);
    
      setNewProject({
        title: ""
      });
    }

    return (
        <div className="Projects">
            <div className="Projects_background">
                <div className="Projects_top">Projects <button className="Project_create_button" onClick={()=>setIsCreateOpen(true)}>Create +</button></div>
                {isCreateOpen &&(
                <form className='project_create_box' onMouseLeave={()=>setIsCreateOpen(false)}  onSubmit={onHandleSubmit}>
                <div className='project_create_context'>
                 <div className='project_insert'>
                <label className='project_top'><b>Title</b></label>
                <input
                className='project_input'
                type="text"
                name="title"
                placeholder="Write title friend"
                value={newProject.title}
                onChange={handleOnChange}
                required
            />
              </div>
            </div>
            <button className='project_create' type='submit'>Create</button>
          </form>
                )}
                <div className="Project_content">
                   {!projects.length ? (
                        <div className="No_projects"><b>No projects</b></div>
                    ) :(
                   projects.filter((item) => {
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
            </NavLink>)))}
                </div>
            </div>
        </div>
    );
};
export default Projects;