import "./styles/Members.css";
import profile_img from "../Header/photo/profile_image.jpeg";
import { useEffect, useState } from "react";
import type { UserType } from "../utilities/Types/UserType";
import { useParams } from "react-router-dom";
import MemberAddMenu from "../../src/app/Pages/MainPage/Components/MemberAddMenu";

const API_URL = import.meta.env.VITE_API_URL;

type CompanyUserGetDto = {
  id: number;
  companyId?: number;
  userId?: number;
  companyRole?: string;
};

const Members = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const { companyId } = useParams();

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const openModal = () => setIsCreateOpen(true);

  const loadMembers = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const companyIdFromStorage = localStorage.getItem("companyId");

      if (!companyIdFromStorage) return;

      const res = await fetch(
        `${API_URL}/Company/Get/Users/${companyIdFromStorage}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        console.error("Company users load failed");
        return;
      }

      const companyUsers: CompanyUserGetDto[] = await res.json();

      const userIds = companyUsers
        .map((x) => x.userId)
        .filter((id): id is number => id != null);

      const usersData = await Promise.all(
        userIds.map(async (id) => {
          const r = await fetch(`${API_URL}/User/ById/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!r.ok) return null;
          return await r.json();
        })
      );

      setUsers(usersData.filter(Boolean) as UserType[]);
    } catch (err) {
      console.error(err);
      setUsers([]);
    }
  };

  useEffect(() => {
    loadMembers();
  }, [companyId]);

  const handleAddMember = async (data: { email: string; role: number }) => {
    const token = localStorage.getItem("accessToken");
    const companyIdFromStorage = Number(localStorage.getItem("companyId"));

    try {
      const userResponse = await fetch(
        `${API_URL}/User/ByEmail/${encodeURIComponent(data.email)}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!userResponse.ok) {
        alert("User not found");
        return;
      }

      const user = await userResponse.json();

      const addResponse = await fetch(`${API_URL}/Company/Update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: 0,
          companyId: companyIdFromStorage,
          userId: user.id,
          companyRole: data.role,
        }),
      });

      if (!addResponse.ok) {
        const text = await addResponse.text();
        throw new Error(text);
      }

      setIsCreateOpen(false);
      await loadMembers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="Mambers_background">
      <div className="Members_top">
        Members

        <button className="User_create_button" onClick={openModal}>
          Add+
        </button>

        <MemberAddMenu
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          onSubmit={handleAddMember}
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
      </div>

      <div className="Members_content">
        <div className="Scroll_top">
          <div>Member Info</div>
        </div>

        <div className="Scroll_content">
          {!users.length ? (
            <div className="No_users"><b>No users</b></div>
          ) : (
            users.map((user) => (
              
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Members;
