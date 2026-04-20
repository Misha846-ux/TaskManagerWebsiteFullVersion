import React, { use, useState } from 'react'
import type { TaskType } from '../types/TaskType';
import { NavLink, useLoaderData } from 'react-router-dom';
import "../styles/Tasks.css";

export default function TaskPageContent(obj: TaskType) {
  if(!obj){
    obj = useLoaderData() as TaskType;
  }
  const [isCompleted, setIsCompleted] = useState<boolean>(obj.isCompleted);

  async function handleToggle(e: React.ChangeEvent<HTMLInputElement>) {
    setIsCompleted(e.target.checked);
    try {
            const res = await fetch(import.meta.env.VITE_Tasks_SERVER_URL +`/${obj.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ completed: e.target.checked }),
            });
        }catch {
            setIsCompleted(!e.target.checked);
        }
    
    // persist change to server here if needed
  }

  return (
    <div className={`task-item ${isCompleted ? 'task-completed' : ''}`}>
      <h3 className="task-title">{obj.title}</h3>
      <p className="task-meta">{obj.description_short}</p>
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