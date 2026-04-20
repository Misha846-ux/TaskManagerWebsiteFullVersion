import React from 'react'
import type { TaskType } from '../types/TaskType';
import TaskComponent from './TaskComponent';
import { useLoaderData } from 'react-router-dom';
import "../styles/Tasks.css";
import { useSelector } from 'react-redux';
import type { RootState } from '../../../../redux/store';

export default function PlacerForTasksComp() {
  const tasksData = useLoaderData() as TaskType[];
  const query = useSelector((state: RootState) => state.search.query)
  if (!tasksData) return null;

  return (
    <div className="placerForTasks">
      {tasksData.filter((item) => {
                    if(query == ""){
                        return true;
                    }
                    else{
                        const regex = new RegExp(query, "i");
                        return regex.test(item.title);
                    }
                   }).map((task) => (
        <TaskComponent key={task.id} {...task} />
      ))}
    </div>
  )
};