import { useEffect, useState } from "react";
import type { UserGet } from "../../../../Domain/User";
import { getMe, getUserAvatar } from "../../../../Infrastructure/ControllersMethods/UserControllerMethods";
import "../../../Styles/GeneralComponentsStyles/Header/Profile.css";



const Profile = () => {
    const [user, setUser] = useState<UserGet>();
    const [img, setImg] = useState<string>();

    useEffect(() => {
        getMe().then((data) => setUser(data));

        if(user?.Id != null){
            getUserAvatar(user?.Id).then((data) => setImg(URL.createObjectURL(data)));
        }
    }, [])
    

    return (
        <div className="profile">
            <b>
                <div className="profile_name">{user?.UserName}</div>
            </b>
            <img className="profile_image" src={img} />
        </div>
    );
};

export default Profile;
