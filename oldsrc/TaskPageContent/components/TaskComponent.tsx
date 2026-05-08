import React, { use, useState } from 'react'
import type { TaskType } from '../../utilities/Types/TaskType';
import { NavLink, useLoaderData } from 'react-router-dom';
import "../styles/Tasks.css";
import type { TaskGetDto } from '../../utilities/DTOs/TaskDTOs/TaskGetDto';

export default function TaskPageContent(obj: TaskGetDto) {
  if(!obj){
    obj = useLoaderData() as TaskGetDto;
  }
  const [isCompleted, setIsCompleted] = useState<boolean>(obj.priority === 'High' ? true : false);

  async function handleToggle(e: React.ChangeEvent<HTMLInputElement>) {
    setIsCompleted(e.target.checked);
    try {
            const res = await fetch(import.meta.env.VITE_API_URL +`/Task/user/UpdateById/${obj.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
                body: JSON.stringify({ completed: e.target.checked }),
            });
        }catch {
            setIsCompleted(!e.target.checked);
        }
    
    // persist change to server here if needed
  }

  return (
    <div className={`task-item ${isCompleted ? 'task-completed' : ''}`}>
      <h3 className="task-title">{obj.taskName}</h3>
      <p className="task-meta">{obj.description}</p>
      <div className="row" style={{ margin: '8px 0' }}>
        <NavLink to={`/task/${obj.id}`} style={{ marginRight: 8 }}>View</NavLink>
      </div>
      <label className="form-row">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={handleToggle}
        />
        {' '}Completed
      </label>
    </div>
  )
}