import ActionsMenu from "../../oldsrc/ActionsMenu/ActionsMenu";
import type { ProjectType } from "../utilities/Types/ProjectType";

type ProjectCardProps = {
  project: ProjectType;
  isActive: boolean;
  onProjectClick: (id: number) => void;
  onDelete: (id: string | number) => void;
  onEdit: (id: string | number, title: string) => void;
  onManageMembers: (id: string | number) => void;
};

const ProjectCard = ({
  project,
  isActive,
  onProjectClick,
  onDelete,
  onEdit,
  onManageMembers,
}: ProjectCardProps) => {
  const percent = project.totalTasks === 0 ? 0 : Math.round((project.tasksDone / project.totalTasks) * 100);

  return (
    <div
      className={`TO_DOES_Project${isActive ? ' active' : ''}`}
      style={{ position: 'relative' }}
    >
      <div style={{ position: 'absolute', top: '5px', right: '5px' }}>
        <ActionsMenu
          entityId={project.id}
          onDelete={onDelete}
          onUpdate={() => onEdit(project.id, project.title)}
          onManageMembers={onManageMembers}
        />
      </div>
      <button
        className="TO_DOES_Project_button"
        type="button"
        onClick={() => onProjectClick(project.id)}
      />
      <div className="TO_DOES_Project_name"><b>{project.title}</b></div>
      <div className="TO_DOES_Project_percent">{percent}%</div>
      <div className="TO_DOES_Project_percent_background_line">
        <div
          className="TO_DOES_Project_percent_line"
          style={{ "--percent": `${percent}%` } as React.CSSProperties}
        ></div>
      </div>
    </div>
  );
};

export default ProjectCard;