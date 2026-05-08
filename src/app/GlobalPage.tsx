import React, { useState } from 'react';
import "./Styles/GlobalPage.css";
import SideBar from './GeneralComponents/SideBar/SideBar.tsx';
import Header from './GeneralComponents/Header/Header.tsx';
import { Outlet } from 'react-router-dom';

const GlobalPage = () => {
    const [isOpen, setIsOpen] = useState(false);

    function sideBareButtonClick(): void {
        setIsOpen(!isOpen);
    }

    return (
        <div className={`MainPage ${isOpen ? "open" : ""}`}>
            <SideBar/>
            <div className="main">
                <Header sideBareButtonClick={sideBareButtonClick}/>
                <Outlet></Outlet>
            </div>
        </div>
    )
}

export default GlobalPage;