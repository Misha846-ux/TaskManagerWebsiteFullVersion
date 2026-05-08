import React, { Fragment } from 'react'
import Calendar from '../Сalendar/Calendar'
import "./styles/TaskPageContent.css";

import TasksCard from '../Сalendar/TasksCard/TasksCard';
import TaskCreatorComp from './components/TaskCreatorComp';
import PlacerForTasksComp from './components/PlacerForTasksComp';
import Modal from './components/CreateTaskModal';

export default function TaskPageContent() {
  const [open, setOpen] = React.useState(false);

  const closeModal = () => {
    setOpen(!open);
  };
  return (
    <>
    <div className='Task_Page'>
    <div className='TaskPageContent_CalendarDate'>
    <div className='Task_Calendar'>
      <Calendar></Calendar>
    </div>
    <div className='Task_Cards'>
      <div className='Card_CompletedTasks'>
      <TasksCard title='COMPLETED TASKS' count={5}/>
      </div>
      <div className='Card_PendingTasks'>
      <TasksCard title='PENDING TASKS' count={100}/>
      </div>
    </div>
    </div>
    <Fragment>
    <button onClick={() => setOpen(!open)} style={{ width: "100px", height: "40px", fontSize: "16px", cursor: "pointer", color: "black", backgroundColor: "orange", border: "none", borderRadius: "4px" }}>
      Create Task
    </button>
    <Modal open={open} closeModal={closeModal} ></Modal>
    </Fragment>
    <div><PlacerForTasksComp/></div>
    </div>
    </>
);
};