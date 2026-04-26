import React from 'react'
import "./styles/Sidebar.css"
import logo_img from "./photos/logo.png";
import comp_img from "./photos/company_img.png"
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import type { Company } from '../utilities/Types/Company';
const API_URL = import.meta.env.VITE_API_URL;

export default function Sidebar() {
  const navigator = useNavigate()

  const [companies, setCompanies] = useState<Company[]>([]);

useEffect(() => {
  fetch(`${API_URL}/Authorization/MyCompanies`, {
    method:"GET",
    credentials: "include",
     headers: {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
  }
  })
   .then(res => {
    if (!res.ok) {
      throw new Error("Unauthorized");
    }
    return res.json();
  })
  .then(data => {
    setCompanies(data);
  })
  .catch(() => {
    setCompanies([]); 
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

  const token = localStorage.getItem("accessToken");
  
  const response = await fetch(`${API_URL}/Company/AddCompany`, {
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      Authorization:`Bearer ${token}`
    },
    body: JSON.stringify(newCompany)
  });

  if(!response.ok){
    console.error("Created error");
    return;
  }

  const createdCompany = await response.json();

  setCompanies(prev=>[...prev,createdCompany]);

  setIsCreateOpen(false);

  setNewCompany({
    name: "",
    description: ""
  });
};

  return (
    <div className="sidebar">
      <div className='Logo_div'>
        <img className='Logo_img' src={logo_img}/>
      </div>
        <h1 className="sidebar_top">Your Companies</h1>
        <button className='Company_create_button' onClick={()=>setIsCreateOpen(true)}>Create +</button>
        {isCreateOpen &&(
          <form className='create_box' onMouseLeave={()=>setIsCreateOpen(false)}  onSubmit={onHandleSubmit}>
            <div className='company_create_context'>
              <div className='company_insert'>
                <label className='company_top'><b>Company name</b></label>
                <input
                className='company_input'
                type="text"
                name="name"
                placeholder="Write name friend"
                value={newCompany.name}
                onChange={handleOnChange}
                required
            />
              </div>
              <div className='company_insert'>
                <label className='company_top'><b>Description</b></label>
                <input
                className='company_input'
                type="text"
                name="description"
                placeholder="Write description friend"
                value={newCompany.description}
                onChange={handleOnChange}
                required
                />
              </div>
            </div>
            <button className='company_create' type='submit'>Create</button>
          </form>
        )}
        <div className='Companies_list'>
          {!companies.length ?(
            <div className='No_companies'><b>No companies</b></div>
          ):(
          companies.map(company=>(
            <div key={company.id} className='Company'>
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
        </div>
        <button className='LogOut_button' onClick={OnClick}><b>LogOut</b></button>
    </div>
  )
}
