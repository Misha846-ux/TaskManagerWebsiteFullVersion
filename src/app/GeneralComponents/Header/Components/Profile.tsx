import { useEffect, useState } from "react";
import type { UserGet } from "../../../../Domain/User";
import { getMe, getUserAvatar } from "../../../../Infrastructure/ControllersMethods/UserControllerMethods";
import "../../../Styles/GeneralComponentsStyles/Header/Profile.css";
import defaultAvatar from "../../../../Images/profile_image.jpeg";



const Profile = () => {
    const [user, setUser] = useState<UserGet | null>(null);
    const [img, setImg] = useState<string>(defaultAvatar);

    useEffect(() => {
        let active = true;

        getMe()
            .then(async (data) => {
                if (!active) return;
                setUser(data);

                try {
                    const avatarBlob = await getUserAvatar(data.Id);
                    if (!active) return;
                    setImg(URL.createObjectURL(avatarBlob));
                } catch {
                    if (!active) return;
                    setImg(defaultAvatar);
                }
            })
            .catch(() => {
                if (!active) return;
                setUser(null);
                setImg(defaultAvatar);
            });

        return () => {
            active = false;
        };
    }, []);

    return (
        <div className="profile">
            <div className="profile_info">
                <b className="profile_name">{user?.UserName}</b>
            </div>
            <img className="profile_image" src={img}/>
        </div>
    );
};

export default Profile;
