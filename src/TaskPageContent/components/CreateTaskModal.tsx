import { createPortal } from "react-dom";
import "./Modal.css";
import TaskCreatorComp from "./TaskCreatorComp";
const modalNode:any= document.getElementById("modal");
const renderContent = (props:any) => {
  return createPortal(
    <div>
      <div className="background" onClick={props.closeModal} />
      <div className="modal">
        <button className="modal__close" onClick={props.closeModal}>
          &times;
        </button>
        <TaskCreatorComp/>
        {props.children}
      </div>
    </div>,
    modalNode
  );
};
const Modal = (props:any) => {
  return props.open === true ? renderContent(props) : null;
};

export default Modal;