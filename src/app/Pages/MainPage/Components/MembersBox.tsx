import ScrolShell from "../../MultiUsedParts/ScrolShell"
import MemberAddMenu from "./MemberAddMenu.tsx";
import type { UserGet } from "../../../../Domain/User";
import "../../../Styles/MainPage/MembersBox.css";
import { getUserAvatar, getUserByEmail, getUserById } from "../../../../Infrastructure/ControllersMethods/UserControllerMethods";
import defaultAvatar from "../../../../Images/profile_image.jpeg";
import { useEffect, useState } from "react";
import { getCompanyId } from "../../../../Infrastructure/LocalStorageMethods.ts";
import { getCompanyUsers, updateCompanyUser } from "../../../../Infrastructure/ControllersMethods/CompanyControllerMethods.ts";
import type { CompanyOfUserUpdate } from "../../../../Domain/Company/CompanyOfUserUpdate.ts";

const MembersBox = () => {
    const [users, setUsers] = useState<UserGet[]>([]);
    const [isCreateMenuOpen, setIsCreateMenuOpen] = useState<boolean>(false);
    const [updateKey, setUpdateKey] = useState<boolean>(false);

    useEffect(() => {
        getCompanyUsers(getCompanyId()).then((data) => {
          data.map(d => {
            getUserById(d.userId as number).then(user => {
              setUsers(prev => [...prev, user]);
            });
          })
        });
    },[updateKey]);

    function onAddMember(email: string, role: number): void{
      getUserByEmail(email).then(user => {
        let newcompanyUser: CompanyOfUserUpdate = {
          id: 0,
          companyId: getCompanyId(),
          userId: user.id,
          companyRole: role
        }
      updateCompanyUser(newcompanyUser).then(() => {setUpdateKey(prev => !prev);});
      });
    }

    return (
        <>
            <MemberAddMenu
                isOpen={isCreateMenuOpen}
                onClose={() => setIsCreateMenuOpen(false)}
                onSubmit={(data) => onAddMember(data.email, data.role)}
                title="Add Member"
                buttonText="Add user"
                emailLabel="Email"
                emailPlaceholder="Enter user email"
                roleLabel="Role"
                roleOptions={[
                    { label: "Employee", value: 2 },
                    { label: "Manager", value: 1 },
                ]}
            />
            <ScrolShell title="Members" buttonText="Add Member" onCreateButtonClicked={() => setIsCreateMenuOpen(true)}>
                {users.length === 0 || users === undefined || null ?
                    <div className="no_items">No members</div>
                    :
                    users.map(user => <MemberCell key={user.id} user={user} />)
                }
            </ScrolShell>
        </>
        
    )
}

export default MembersBox;

type MemberCellProps = {
  user: UserGet;
}

const MemberCell = ({ user }: MemberCellProps) => {

  const [profileImg, setProfileImg] = useState<string>(defaultAvatar);
  useEffect(() => {
    if(user.passToIcon !== undefined || null || "") {
      getUserAvatar(user.id).then(img => setProfileImg(URL.createObjectURL(img)));
    }
  },[])

  return (
    <div className="Members_profile" key={user.id}>
      <img className="Members_profile_image" src={profileImg} />
      <div className="Members_profile_name">
        {user.userName}
      </div>
    </div>
  )
}