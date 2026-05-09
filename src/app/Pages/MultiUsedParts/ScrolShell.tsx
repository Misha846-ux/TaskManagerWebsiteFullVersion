import { useState } from "react";
import "../../Styles/MultiUsedStyles/ScrolShell.css";

type ProjectsShellProps = {
  children: React.ReactNode;
  title: string;
  buttonText?: string;
  onCreateButtonClicked: () => void;
};

const ScrolShell = ({ children, title, buttonText, onCreateButtonClicked }: ProjectsShellProps) => {

  return (
    <>
      <div className="ScrolShell">
        <div className="ScrolShell_background">
          <div className="ScrolShell_top">
            {title}
            {buttonText == null || undefined || ""?
            "" :
            <button className="ScrolShell_create_button" onClick={onCreateButtonClicked}>
              {buttonText}
            </button>}
            
          </div>

          <div className="ScrolShell_content">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default ScrolShell;