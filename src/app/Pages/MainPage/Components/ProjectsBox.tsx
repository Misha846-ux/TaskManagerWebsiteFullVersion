import { useState, useEffect } from "react"
import ScrolShell from "../../MultiUsedParts/ScrolShell"
import type { ProjectGet, ProjectPost } from "../../../../Domain/Project";
import { createProject, deleteMyProject, getProjectsByCompanyId } from "../../../../Infrastructure/ControllersMethods/ProjectsControllerMethods";
import { getCompanyId } from "../../../../Infrastructure/LocalStorageMethods";
import "../../../Styles/MainPage/ProjectsBox.css"
import OneInputMenu from "../../MultiUsedParts/OneInputMenu";
import ActionsMenu from "../../MultiUsedParts/ActionsMenu";
import { getTasksByProject } from "../../../../Infrastructure/ControllersMethods/TaskControllerMethods";



const ProjectsBox = () => {
    const [projects, setProjects] = useState<ProjectGet[]>();
    const [isCreateMenuOpen, setIsCreateMenuOpen] = useState<boolean>(false);
    const [updateKey, setUpdateKey] = useState<boolean>(false);

    useEffect(() => {
        getProjectsByCompanyId(getCompanyId()).then(data => setProjects(data))
        window.dispatchEvent(new Event("ProjectAdd"));
    },[updateKey]);

    function CreateProject(projectName: string){
        setIsCreateMenuOpen(false);
        let newProject: ProjectPost = {
            title: projectName,
            companyId: getCompanyId()
        }
        createProject(newProject).then(() => {
            getProjectsByCompanyId(getCompanyId()).then(data => setProjects(data));
            window.dispatchEvent(new Event("ProjectAdd"));
        })
    }

    return (
        <>
            <OneInputMenu isOpen={isCreateMenuOpen}
            onClose={() => setIsCreateMenuOpen(false)}
            onSubmit={CreateProject}
            title="Create Project"
            placeholder="Enter project name"
            buttonText="create"
            label="Project Name"
            />
            <ScrolShell title="Projects" buttonText="Create Project" 
            onCreateButtonClicked={() => setIsCreateMenuOpen(true)} >
                {projects?.length === 0 || projects === undefined || projects === null ? 
                (<div className="no_items">No projects</div>) : 
                (projects?.map(project => <ProjectCard key={project.id} project={project} 
                updateKey={updateKey} setUpdateKey={setUpdateKey}/>))}
            </ScrolShell>
        </>
        
    )
}
export default ProjectsBox;

type ProjectCardProps = {
    project: ProjectGet;
    updateKey: boolean;
    setUpdateKey: (value: boolean) => void
}

const ProjectCard = ({ project, updateKey, setUpdateKey }: ProjectCardProps) => {
    const [percent, setPercent] = useState<number>(0);

    useEffect(() => {
        getTasksByProject(project.id).then(data => {
            if(data.length == 0) {
                setPercent(100);
                return;
            }
            else{
                setPercent(data.length === 0 ? 0 : Math.round((data.filter(t => t.status === "Completed").length / data.length) * 100));
            }
        });
    },[]);

    

    function onDelete(projectId: number){
        deleteMyProject(projectId).then(() => {
            setUpdateKey(!updateKey);
        })
    }
    return (
        <div className="TO_DOES_Project">
            <button
                className="TO_DOES_Project_button"
                type="button"
                onClick={() => {}}
            />
            <div className="TO_DOES_Project_name"><b>{project.title}</b></div>
            <div className="TO_DOES_Project_percent">{percent}%</div>
            <div className="TO_DOES_Project_percent_background_line">
                <div
                    className="TO_DOES_Project_percent_line"
                    style={{ "--percent": `${percent}%` } as React.CSSProperties}
                ></div>
            </div>
            <ActionsMenu
                entityId={project.id}
                onDelete={(value) => onDelete(project.id)}
                onUpdate={() => {}}
            />
        </div>
    )
}