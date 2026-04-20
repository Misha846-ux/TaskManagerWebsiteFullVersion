import Header from "../Header/Header";
import React, { useState } from "react";
import "./style/MainPage.css";
import Timer from "../Timer/Timer";
import Project_Worked from "../Project_Worked/Project_Worked";
import MainContent from "./PageContent/MainContent/MainContent";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import TaskPageContent from "./PageContent/TaskPageContent/TaskPageContent";
import Sidebar from "../Sidebar/Sidebar";



const MainPage: React.FC = () =>{
    const [isOpen, setIsOpen] = useState(false);
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