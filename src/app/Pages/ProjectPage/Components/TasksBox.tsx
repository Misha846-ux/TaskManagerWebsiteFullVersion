import { useEffect, useState } from "react"
import "../../../Styles/ProjectPage/TasksBox.css"
import type { TaskGet } from "../../../../Domain/Task"
import { getTasksByProject } from "../../../../Infrastructure/ControllersMethods/TaskControllerMethods"
import { useParams } from "react-router-dom"


const TasksBox = () => {
    const [filter, setFilter] = useState("All")
    const [tasks, setTasks] = useState<TaskGet[]>([]);
    const { id } = useParams();

    useEffect(()=>{
        getTasksByProject(Number(id)).then((data) => {
            setTasks(data);
        })
    },[])


    return (
        <div className="TasksBox">
            <div className="TasksBoxPanel">
                <div className="TasksBoxTitle">Tasks board</div>
                <div className="TasksBoxControls">
                    <div className="TasksBoxButtons">
                        {['All', 'Waiting', 'InProgress', 'Completed'].map((label) => (
                            <button
                                key={label}
                                type="button"
                                className={filter === label ? 'active' : ''}
                                onClick={() => setFilter(label)}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                    <button type="button" className="TasksBoxAction">New task</button>
                </div>
            </div>
            <div className="TasksGrid">
                {((tasks === undefined || null) || tasks.length == 0) ?
                <div>No tasks</div> :
                tasks.map((task) => {
                    if (filter != "All" && task.status != filter){
                        return null;
                    }

                    return (
                        <TaskCell task={task}/>
                    )
                    
                })}
            </div>
        </div>
    )
}

export default TasksBox;

type TaskCellProperties = {
    task: TaskGet
}

const TaskCell = ({ task }: TaskCellProperties) => {
    return (
        <div className={`task-item ${task.status == "Completed" ? "task-completed" : ""}`}>
            <div className="task-title">{task.taskName}</div>
            <p className="task-meta">{task.description}</p>
            <div className="task-row">
                <span className="task-tag">{task.priority}</span>
                <span className="task-due">{task.deadLine.toLocaleDateString()}</span>
            </div>
            <div className="task-actions">
                <button className="task-button">View</button>
                <button className="task-button secondary">Complete</button>
            </div>
        </div>
    )
}