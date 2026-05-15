import React, { useState } from 'react';
import "./Styles/GlobalPage.css";
import SideBar from './GeneralComponents/SideBar/SideBar.tsx';
import Header from './GeneralComponents/Header/Header.tsx';
import { Outlet } from 'react-router-dom';

const GlobalPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [updateKey, setUpdateKey] = useState<boolean>(false);
    function sideBareButtonClick(): void {
        setIsOpen(!isOpen);
    }

    window.addEventListener("companyChanged", () => {
        setUpdateKey(!updateKey);
    });

    return (
        <div className={`MainPage ${isOpen ? "open" : ""}`}>
            <SideBar/>
            <div className="main">
                <Header sideBareButtonClick={sideBareButtonClick}/>
                <Outlet key={Number(updateKey)}></Outlet>
            </div>
        </div>
    )
}

export default GlobalPage;