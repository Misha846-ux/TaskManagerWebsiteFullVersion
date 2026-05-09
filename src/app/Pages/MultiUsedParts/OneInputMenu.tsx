import { useState } from "react";
import "../../Styles/MultiUsedStyles/OneInputMenu.css";

type OneInputProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (value: string) => Promise<void> | void;
  title: string;
  placeholder: string;
  buttonText: string;
  label: string;
};

const OneInputMenu = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  placeholder,
  buttonText,
  label,
}: OneInputProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(inputValue);
    setInputValue("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
        <h2 className="modal-title">{title}</h2>
        <form className="create-form" onSubmit={handleSubmit}>
          <div className="create-context">
            <div className="create-insert">
              <label className="create-label"><b>{label}</b></label>
              <input
                className="create-input"
                type="text"
                value={inputValue}
                placeholder={placeholder}
                onChange={handleOnChange}
                required
              />
            </div>
          </div>
          <button className="create-button" type="submit">{buttonText}</button>
        </form>
      </div>
    </div>
  );
};

export default OneInputMenu;