import React from 'react'
import Calendar from '../../../Сalendar/Calendar'
import "./styles/TaskPageContent.css";

import TasksCard from '../../../Сalendar/TasksCard/TasksCard';
import TaskCreatorComp from './components/TaskCreatorComp';
import PlacerForTasksComp from './components/PlacerForTasksComp';

export default function TaskPageContent() {
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
    <div className='Task_Add'>
    <TaskCreatorComp/>
    <PlacerForTasksComp/>
    </div>
    </div>
    </>
);
};
