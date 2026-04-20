import "./styles/Members.css";
import profile_img from "../Header/photo/profile_image.jpeg";
import { useEffect, useState } from "react";
import { GetUsers } from "../utilities/Methods/UsersMethods";
import type { UserType } from "../utilities/Types/UserType";
import { useNavigate } from 'react-router-dom'
const Members = () => {
    const [users, setUsers] = useState<UserType[]>([]);

    const navigator = useNavigate();

    const OnClick = () => {
    localStorage.clear();
    navigator("/");
    }

    useEffect(()=>{
        GetUsers().then((value) => {
            setUsers(Array.isArray(value) ? value : []);
        })
        .catch(() => {
            setUsers([]);
        });
    },[]);
    return(
        <div className="Mambers_background">
            <div className="Members_top">Members <button onClick={OnClick} className='User_create_button'>Create +</button></div>
            <div className="Members_content">
                <div className="Scroll_top">
                <div>Member Info</div>
                </div>
                <div className="Scroll_content">
                    {!users.length ? (
                        <div className="No_users"><b>No users</b></div>
                    ) : (
                    users.map((user) => (
                        <div className="Members_profile" key={user.id}>
                        <img className="Members_profile_image" src={profile_img}/>
                        <div className="Members_profile_name">{user.userName}</div>
                        </div>
                    )))}
                
                </div>
            </div>
        </div>
    );
};

export default Members;