import "./styles/Members.css";
import profile_img from "../Header/photo/profile_image.jpeg";
import { useEffect, useState } from "react";
import type { UserType } from "../utilities/Types/UserType";
import { useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

type CompanyRole = 1 | 2;

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

  const [form, setForm] = useState({
    email: "",
    role: 2 as CompanyRole,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "role" ? Number(value) : value,
    }));
  };

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

  const onHandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("accessToken");
    const companyIdFromStorage = Number(localStorage.getItem("companyId"));

    try {
      // ✅ FIXED URL (route param)
      const userResponse = await fetch(
        `${API_URL}/User/ByEmail/${encodeURIComponent(form.email)}`,
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

      // ❗ ВАЖНО: У ТЕБЯ PUT, НЕ POST
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
          companyRole: form.role,
        }),
      });

      if (!addResponse.ok) {
        const text = await addResponse.text();
        throw new Error(text);
      }

      setIsCreateOpen(false);
      setForm({ email: "", role: 2 });

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

        {isCreateOpen && (
          <form
            className="User_add_box"
            onMouseLeave={() => setIsCreateOpen(false)}
            onSubmit={onHandleSubmit}
          >
            <div className="project_create_context">
              <div className="project_insert">
                <label className="project_top"><b>Email</b></label>
                <input
                  className="project_input"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="project_insert">
                <label className="project_top"><b>Role</b></label>
                <select
                  className="project_input"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                >
                  <option value={2}>Employee</option>
                  <option value={1}>Manager</option>
                </select>
              </div>
            </div>

            <button className="project_create" type="submit">
              Add user
            </button>
          </form>
        )}
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
              <div className="Members_profile" key={user.id}>
                <img className="Members_profile_image" src={profile_img} />
                <div className="Members_profile_name">
                  {user.userName}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Members;
