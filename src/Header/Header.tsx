
import { useState, useEffect } from "react";
import profile_img from "./photo/profile_image.jpeg";
import "./styles/Header.css";
import { NavLink } from "react-router-dom";
import type { UserType } from "../utilities/Types/UserType";
import { useDispatch } from "react-redux";
import { setQuery } from "../redux/reducers/SearchLineReduser";
import { getChanges } from "../utilities/Methods/ChangeMethods";

type HeaderProps = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const Header:React.FC<HeaderProps> = ({ isOpen, setIsOpen }) =>{
    const toggleSidebar = () => {
        setIsOpen(prev => !prev);
    };
    const dispatch = useDispatch();
    const OnChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const str = e.target.value;
        dispatch(setQuery(str));
    }
    const profileString = localStorage.getItem("user");
    const profile: UserType | null = profileString ? JSON.parse(profileString) : null;

 const [isCreateOpen, setIsCreateOpen] = useState(false);
 const [changes, setChanges] = useState([]);
 const loadChanges = async () => {
    try {
        const data = await getChanges();
        setChanges(data);
    } catch (error) {
        console.error(error);
    }
};
    return( 
        <>
       
        <div className="Header">
            <button type="button" onClick={toggleSidebar} className="dash_button"></button>
            <NavLink to="/MainPage/MainContent" className="dashboard"><b>TaskWebSite</b></NavLink>
            <div className="search_box">
            <input className="search" placeholder="Search Project..." onChange={OnChange}/>
            <button className="search_button"></button>
            </div>
            <button className="message_button" onClick={() => {
                    setIsCreateOpen(true); loadChanges();}}></button>
            {isCreateOpen &&(
                <div className="Change_box" onMouseLeave={()=>setIsCreateOpen(false)} >
                    <div className="Change_top">Changes</div>
                    <div className="Change_context">
                        {changes.length === 0 ? (
                            <div className="No_changes">No changes</div>
                            ) : (changes.map((item:any) => (
                <div className="change_message_box">
                <div key={item.id}>
                <div className="change_message">{item.message}</div>
                <div className="change_time">{item.createdAt}</div>
                </div>
            </div>
            ))
            )}
            </div>
                </div>
            )}
            <div className="profile">
            <b><div className="profile_name">{profile?.userName || "Guest"}</div></b>
            <img className="profile_image" src={profile_img}/>
            </div>
        </div>

        </>
    );
};
export default Header;