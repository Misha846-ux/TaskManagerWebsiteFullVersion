import { useEffect, useState } from "react";
import "./styles/Projects.css";
import {
  GetProjects,
  UpdateProject,
  DeleteProject,
} from "../utilities/Methods/ProjectMethods";
import type { ProjectType } from "../utilities/Types/ProjectType";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { useNavigate, useParams } from "react-router-dom";
import Modal from '../components/Modal';
import ProjectsShell from "../../src/app/Pages/MultiUsedParts/ScrolShell";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(() => {
    const stored = localStorage.getItem("selectedProjectId");
    return stored ? Number(stored) : null;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const query = useSelector((state: RootState) => state.search.query);
  const navigate = useNavigate();
  const { companyId } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<Record<string, string>>({});
  const [modalFields, setModalFields] = useState<{ name: string; label: string; type: string; value: string }[]>([]);
  const [modalTitle, setModalTitle] = useState('');
  const [onModalSave, setOnModalSave] = useState<((data: Record<string, string>) => void) | null>(null);

  const persistSelectedProjectId = (projectId: number | null) => {
    setSelectedProjectId(projectId);
    if (projectId === null) {
      localStorage.removeItem("selectedProjectId");
    } else {
      localStorage.setItem("selectedProjectId", String(projectId));
    }
  };

  const loadProjects = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await GetProjects(Number(companyId));
      setProjects(Array.isArray(result) ? result : []);
    } catch (err) {
      console.error(err);
      setError("Unable to load projects.");
      setProjects([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, [companyId]);

  const handleDelete = async (id: string | number) => {
    try {
      await DeleteProject(id);
      setProjects((prev) => prev.filter((project) => project.id !== Number(id)));
      if (selectedProjectId === Number(id)) persistSelectedProjectId(null);
    } catch (err) {
      console.error(err);
      setError("Unable to delete project.");
    }
  };

  const handleEditStart = (id: string | number, title: string) => {
    setError(null);
    setModalTitle('Update Project');
    setModalFields([
      { name: 'title', label: 'Project Title', type: 'text', value: title },
    ]);
    setModalData({ title });
    setOnModalSave(() => async (data: Record<string, string>) => {
      const title = data.title.trim();
      if (!title) return;
      setError(null);

      try {
        await UpdateProject(id, { title });
        setProjects((prev) =>
          prev.map((project) =>
            project.id === Number(id)
              ? {
                  ...project,
                  title,
                }
              : project
          )
        );
        if (selectedProjectId === Number(id)) {
          persistSelectedProjectId(Number(id));
        }
      } catch (err) {
        console.error(err);
        setError("Unable to update project.");
      }
    });
    setIsModalOpen(true);
  };

  const handleManageMembers = (id: string | number) => {
    persistSelectedProjectId(Number(id));
    navigate(`/MainPage/Members/${id}`);
  };

  const handleProjectClick = (id: string | number) => {
    persistSelectedProjectId(Number(id));
    navigate(`/MainPage/TaskContent/${id}`);
  };

  const filteredProjects = projects.filter((item) => {
    if (query === "") {
      return true;
    }
    return item.title.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <ProjectsShell onProjectCreated={loadProjects}>
      {error && <div className="No_projects"><b>{error}</b></div>}
      {isLoading && !projects.length ? (
        <div className="No_projects"><b>Loading projects...</b></div>
      ) : !projects.length ? (
        <div className="No_projects"><b>No projects</b></div>
      ) : (
        filteredProjects.map((item) => {
          const isActive = item.id === selectedProjectId;
          return (
            <ProjectCard
              key={item.id}
              project={item}
              isActive={isActive}
              onProjectClick={handleProjectClick}
              onDelete={handleDelete}
              onEdit={handleEditStart}
              onManageMembers={handleManageMembers}
            />
          );
        })
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={onModalSave || (() => {})}
        title={modalTitle}
        fields={modalFields}
        initialData={modalData}
      />
    </ProjectsShell>
  );
};

export default Projects;