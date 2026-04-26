import Header from "../Header/Header";
import React, { useState } from "react";
import "./style/MainPage.css";
import Timer from "../Timer/Timer";
import Project_Worked from "../Project_Worked/Project_Worked";
import MainContent from "./PageContent/MainContent/MainContent";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import TaskPageContent from "./PageContent/TaskPageContent/TaskPageContent";
import Sidebar from "../Sidebar/Sidebar";
import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;


const MainPage: React.FC = () =>{
    const [isOpen, setIsOpen] = useState(false);

  const navigator = useNavigate();

  useEffect(() => {
  const refresh = async () => {
    const storedCompanyId = localStorage.getItem("companyId");

    if (!storedCompanyId) return;

    const companyId = Number(storedCompanyId);
    console.log(API_URL);
    const response = await fetch(`${API_URL}/Authorization/Refresh?companyId=${companyId}`, {
      method: "POST",
      credentials: "include"
    });

    if (!response.ok) {
      console.error("Refresh failed");
      return;
    }

    const token = await response.text();

    localStorage.setItem("accessToken", token);
    localStorage.setItem("companyId", companyId.toString());

    navigator(`/MainPage/MainContent/company/${companyId}`);
    console.log(response);
  };

  refresh();
}, []);

    return(
        <div className={`MainPage ${isOpen ? "open" : ""}`}>
            <Sidebar/>
            <div className="main"> 
            <Header isOpen={isOpen} setIsOpen={setIsOpen}/>
            <Outlet></Outlet>
            </div>
        </div>
    );
};

export default MainPage;