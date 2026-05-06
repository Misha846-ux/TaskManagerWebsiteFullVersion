import Header from "../Header/Header";
import React, { useState } from "react";
import "./style/MainPage.css";
import Timer from "../Timer/Timer";
import Project_Worked from "../Project_Worked/Project_Worked";
import MainContent from "./PageContent/MainContent/MainContent";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import TaskPageContent from "../TaskPageContent/TaskPageContent";
import Sidebar from "../Sidebar/Sidebar";
import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;


const MainPage: React.FC = () =>{
    const [isOpen, setIsOpen] = useState(false);

  const navigator = useNavigate();

  const [companyId, setCompanyId] = useState<number | null>(null);

  useEffect(() => {
  const init = async () => {
    let storedCompanyId = localStorage.getItem("companyId");

    try {
      if (!storedCompanyId) {
        const companiesResponse = await fetch(
          `${API_URL}/Authorization/MyCompanies`,
          {
            method: "GET",
            credentials: "include"
          }
        );

        const companies = await companiesResponse.json();

        if (!companies.length) return;

        storedCompanyId = companies[0].id.toString();

        localStorage.setItem("companyId", storedCompanyId!);
      }

      const response = await fetch(
        `${API_URL}/Authorization/Refresh?companyId=${storedCompanyId}`,
        {
          method: "POST",
          credentials: "include"
        }
      );

      if (!response.ok) {
        localStorage.clear();
        navigator("/");
        return;
      }

      const newToken = await response.text();

      localStorage.setItem("accessToken", newToken);

      setCompanyId(Number(storedCompanyId));

      navigator(`/MainPage/MainContent/company/${storedCompanyId}`);
    } catch (error) {
      console.error(error);
    }
  };

  init();
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