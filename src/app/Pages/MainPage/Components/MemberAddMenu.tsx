import { useEffect, useState } from "react";
import "../../../Styles/MainPage/MemberAddMenu.css";


type RoleOption = {
  label: string;
  value: number;
};

type MemberAddMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { email: string; role: number }) => Promise<void> | void;
  title: string;
  buttonText: string;
  emailLabel?: string;
  emailPlaceholder?: string;
  roleLabel?: string;
  roleOptions?: RoleOption[];
};

const MemberAddMenu = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  buttonText,
  emailLabel = "Email",
  emailPlaceholder = "Enter email",
  roleLabel = "Role",
  roleOptions = [
    { label: "Employee", value: 2 },
    { label: "Manager", value: 1 },
  ],
}: MemberAddMenuProps) => {
  const [form, setForm] = useState({ email: "", role: roleOptions[0].value });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "role" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(form);
    setForm({ email: "", role: roleOptions[0].value });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <h2 className="modal-title">{title}</h2>
        <form className="create-form" onSubmit={handleSubmit}>
          <div className="create-context">
            <div className="create-insert">
              <label className="create-label"><b>{emailLabel}</b></label>
              <input
                className="create-input"
                type="email"
                name="email"
                placeholder={emailPlaceholder}
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="create-insert">
              <label className="create-label"><b>{roleLabel}</b></label>
              <select
                className="create-input"
                name="role"
                value={form.role}
                onChange={handleChange}
              >
                {roleOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button className="create-button" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MemberAddMenu;


