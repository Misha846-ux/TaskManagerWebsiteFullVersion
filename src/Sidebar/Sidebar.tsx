import React from 'react'
import "./styles/Sidebar.css"
import logo_img from "./photos/logo.png";
import comp_img from "./photos/company_img.png"
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import type { Company } from '../utilities/Types/Company';
import type { ProjectType } from '../utilities/Types/ProjectType';
import { GetProjects } from '../utilities/Methods/ProjectMethods';
import {
  GetMyCompanies,
  AddCompany,
  UpdateCompany,
  DeleteCompanyById,
} from '../utilities/Methods/CompanyMethods';
import ActionsMenu from "../ActionsMenu/ActionsMenu";
import Modal from '../components/Modal';
const API_URL = import.meta.env.VITE_API_URL;

export default function Sidebar() {
  const navigator = useNavigate()

  const [companies, setCompanies] = useState<Company[]>([]);
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(() => {
    const stored = localStorage.getItem("selectedProjectId");
    return stored ? Number(stored) : null;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<Record<string, string>>({});
  const [modalFields, setModalFields] = useState<{ name: string; label: string; type: string; value: string }[]>([]);
  const [modalTitle, setModalTitle] = useState('');
  const [onModalSave, setOnModalSave] = useState<((data: Record<string, string>) => void) | null>(null);

useEffect(() => {
  GetMyCompanies()
    .then((data) => {
      setCompanies(Array.isArray(data) ? data : []);
    })
    .catch(() => {
      setCompanies([]);
    });

  GetProjects()
    .then((data) => {
      setProjects(Array.isArray(data) ? data : []);
    })
    .catch(() => {
      setProjects([]);
    });
}, []);

const handleCompanyClick = async (companyId: number) => {
  const response = await fetch(`${API_URL}/Authorization/Refresh?companyId=${companyId}`, {
    method:"POST",
    credentials: "include"
  });

  const token = await response.text();

  localStorage.setItem("accessToken", token.toString());
  localStorage.setItem("companyId", companyId.toString());
  
   navigator(`/MainPage/MainContent/company/${companyId}`);
};

  const handleProjectClick = (projectId: number) => {
    localStorage.setItem("selectedProjectId", String(projectId));
    setSelectedProjectId(projectId);
    navigator(`/MainPage/TaskContent/${projectId}`);
  };

  const OnClick = () => {
    localStorage.clear();
    navigator("/");
  }
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [newCompany, setNewCompany] = useState({
  name: "",
  description: ""
});

const handleOnChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
  const {name, value} = e.target;

  setNewCompany(prev =>({
    ...prev,
    [name]:value
  }));
};
const onHandleSubmit = async (e:React.FormEvent) =>{
  e.preventDefault();

  try {
    const createdCompany = await AddCompany(newCompany);
    setCompanies((prev) => [...prev, createdCompany]);
    setIsCreateOpen(false);
    setNewCompany({
      name: "",
      description: ""
    });
  } catch (err) {
    console.error(err);
    alert("Unable to create company.");
  }
};

const handleCompanyDelete = async (companyId: string | number) => {
  const id = Number(companyId);
  if (Number.isNaN(id)) return;
  if (!window.confirm("Delete this company?")) return;

  try {
    await DeleteCompanyById(id);
    setCompanies((prev) => prev.filter((company) => company.id !== id));
    if (Number(localStorage.getItem("companyId")) === id) {
      localStorage.removeItem("companyId");
    }
  } catch (err) {
    console.error(err);
    alert("Unable to delete company.");
  }
};

const handleCompanyUpdate = async (companyId: string | number) => {
  const id = Number(companyId);
  if (Number.isNaN(id)) return;
  const company = companies.find((item) => item.id === id);
  if (!company) return;

  setModalTitle('Update Company');
  setModalFields([
    { name: 'name', label: 'Company Name', type: 'text', value: company.name },
    { name: 'description', label: 'Description', type: 'text', value: company.description },
  ]);
  setModalData({ name: company.name, description: company.description });
  setOnModalSave(() => async (data: Record<string, string>) => {
    try {
      await UpdateCompany(id, {
        name: data.name,
        description: data.description,
      });
      setCompanies((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, name: data.name, description: data.description }
            : item
        )
      );
    } catch (err) {
      console.error(err);
      alert("Unable to update company.");
    }
  });
  setIsModalOpen(true);
};

  return (
    <div className="sidebar">
      <div className='Logo_div'>
        <img className='Logo_img' src={logo_img}/>
      </div>
        <h1 className="sidebar_top">Your Companies</h1>
        <button className='Company_create_button' onClick={()=>setIsCreateOpen(true)}>Create +</button>
        <div className='Companies_list'>
          {!companies.length ?(
            <div className='No_companies'><b>No companies</b></div>
          ):(
          companies.map(company=>(
            <div key={company.id} className='Company' style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: '5px', right: '5px' }}>
                <ActionsMenu
                  entityId={company.id}
                  onDelete={handleCompanyDelete}
                  onUpdate={handleCompanyUpdate}
                  onManageMembers={() => handleCompanyClick(company.id)}
                />
              </div>
              <div className='Company_top'>Company name</div>
              <div className='Company_profile'>
              <div className='Company_name'>
                <b>{company.name}</b>
                </div>
                <div className='Company_img' onClick={() => handleCompanyClick(company.id)}>
                  <img className='comp_img' src={comp_img}></img>
                </div>
                </div>
              </div>
          )))}
        </div>        <div className='sidebar_subsection'>
          <h2 className='sidebar_subtitle'>Your Projects</h2>
          {!projects.length ? (
            <div className='No_companies'><b>No projects</b></div>
          ) : (
            projects.map((project) => (
              <div
                key={project.id}
                className={`Company project-item${selectedProjectId === project.id ? ' active' : ''}`}
                onClick={() => handleProjectClick(project.id)}
                style={{ cursor: 'pointer' }}
              >
                <div className='Company_name'><b>{project.title}</b></div>
              </div>
            ))
          )}
        </div>
        <button className='LogOut_button' onClick={OnClick}><b>LogOut</b></button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={onModalSave || (() => {})}
        title={modalTitle}
        fields={modalFields}
        initialData={modalData}
      />
    </div>
  )
}