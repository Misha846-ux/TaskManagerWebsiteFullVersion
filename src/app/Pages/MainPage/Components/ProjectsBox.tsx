import { useState, useEffect } from "react"
import ScrolShell from "../../MultiUsedParts/ScrolShell"
import type { ProjectGet } from "../../../../Domain/Project";
import { getProjectsByCompanyId } from "../../../../Infrastructure/ControllersMethods/ProjectsControllerMethods";
import { getCompanyId } from "../../../../Infrastructure/LocalStorageMethods";
import "../../../Styles/MainPage/ProjectsBox.css"
import OneInputMenu from "../../MultiUsedParts/OneInputMenu";
import ActionsMenu from "../../MultiUsedParts/ActionsMenu";

const ProjectsBox = () => {
    const [projects, setProjects] = useState<ProjectGet[]>();
    const [isCreateMenuOpen, setIsCreateMenuOpen] = useState<boolean>(false);
    let companyId: number = getCompanyId();

    useEffect(() => {
        getProjectsByCompanyId(companyId).then(data => setProjects(data))
    },[companyId]);


    return (
        <>
            <OneInputMenu isOpen={isCreateMenuOpen}
            onClose={() => setIsCreateMenuOpen(false)}
            onSubmit={(value) => console.log(value)}
            title="Create Project"
            placeholder="Enter project name"
            buttonText="create"
            label="Project Name"
            />
            <ScrolShell title="Projects" buttonText="Create Project" 
            onCreateButtonClicked={() => setIsCreateMenuOpen(true)}>
                {projects?.length === 0 || projects === undefined || projects === null ? 
                (<div className="no_items">No projects</div>) : 
                (projects?.map(project => <ProjectCard key={project.Id} project={project} />))}
            </ScrolShell>
        </>
        
    )
}
export default ProjectsBox;

type ProjectCardProps = {
    project: ProjectGet;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
    const percent: number = 100;

    return (
        <div className="TO_DOES_Project">
            <button
                className="TO_DOES_Project_button"
                type="button"
                onClick={() => {}}
            />
            <div className="TO_DOES_Project_name"><b>{project.Title}</b></div>
            <div className="TO_DOES_Project_percent">{percent}%</div>
            <div className="TO_DOES_Project_percent_background_line">
                <div
                    className="TO_DOES_Project_percent_line"
                    style={{ "--percent": `${percent}%` } as React.CSSProperties}
                ></div>
            </div>
            <ActionsMenu
                entityId={project.Id}
                onDelete={() => {}}
                onUpdate={() => {}}
                onManageMembers={() => {}}
            />
        </div>
    )
}