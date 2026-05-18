import ScrolShell from "../../MultiUsedParts/ScrolShell"
import MemberAddMenu from "./MemberAddMenu.tsx";
import type { UserGet } from "../../../../Domain/User";
import "../../../Styles/MainPage/MembersBox.css";
import { getUserAvatar, getUserByEmail, getUserById } from "../../../../Infrastructure/ControllersMethods/UserControllerMethods";
import defaultAvatar from "../../../../Images/profile_image.jpeg";
import { useEffect, useState } from "react";
import { getCompanyId } from "../../../../Infrastructure/LocalStorageMethods.ts";
import { deleteCompanyUserById, getCompanyUsers, updateCompanyUser } from "../../../../Infrastructure/ControllersMethods/CompanyControllerMethods.ts";
import type { CompanyOfUserUpdate } from "../../../../Domain/Company/CompanyOfUserUpdate.ts";
import ActionsMenu from "../../MultiUsedParts/ActionsMenu.tsx";
import type { CompanyUserGet } from "../../../../Domain/Company/CompanyUserGet.ts";

const MembersBox = () => {
    const [users, setUsers] = useState<[UserGet, CompanyUserGet][] >([]);
    const [isCreateMenuOpen, setIsCreateMenuOpen] = useState<boolean>(false);
    const [updateKey, setUpdateKey] = useState<boolean>(false);

    useEffect(() => {
      setUsers([]);
        getCompanyUsers(getCompanyId()).then((data) => {
          data.map(d => {
            getUserById(d.userId as number).then(user => {
              setUsers(prev => [...prev, [user, d]]);
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
                    users.map(user =>  <MemberCell key={user[1].id} user={user[0]} 
                      updateKey={updateKey} setUpdateKey={setUpdateKey} companyUserId={user[1].id}/>)
                }
            </ScrolShell>
        </>
        
    )
}

export default MembersBox;

type MemberCellProps = {
  companyUserId: number;
  user: UserGet;
  updateKey: boolean;
  setUpdateKey: (value: boolean) => void;
}

const MemberCell = ({ companyUserId, user, updateKey, setUpdateKey }: MemberCellProps) => {

  const [profileImg, setProfileImg] = useState<string>(defaultAvatar);
  useEffect(() => {
    if(user.passToIcon !== undefined || null || "") {
      getUserAvatar(user.id).then(img => setProfileImg(URL.createObjectURL(img)));
    }
  },[])

  function onDelete(userComapnyId: number){
    deleteCompanyUserById(userComapnyId).then(() => {
      setUpdateKey(!updateKey);
    })
  }

  return (
    <div className="Members_profile" key={user.id}>
      <img className="Members_profile_image" src={profileImg} />
      <div className="Members_profile_name">
        {user.userName}
      </div>
      <div>
        <ActionsMenu
          entityId={companyUserId}
          onDelete={() => {onDelete(companyUserId)}}
        />
      </div>
    </div>
  )
}