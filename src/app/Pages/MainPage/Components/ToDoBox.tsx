import { useEffect, useState } from "react";
import type { TaskGet } from "../../../../Domain/Task";
import ScrolShell from "../../MultiUsedParts/ScrolShell"
import ActionsMenu from "../../MultiUsedParts/ActionsMenu";
import { getTasksByUserId } from "../../../../Infrastructure/ControllersMethods/TaskControllerMethods";
import { getMe } from "../../../../Infrastructure/ControllersMethods/UserControllerMethods";
import "../../../Styles/MainPage/ToDoBox.css";

const ToDoBox = () => {
    const [tasks, setTasks] = useState<TaskGet[]>([]);
    useEffect(() => {
        getMe().then(user => {
            getTasksByUserId(user.id).then(data => setTasks(data));
        });
    },[])
    return (
        <>
            <ScrolShell title="To Do's" onCreateButtonClicked={() => {}}>
                {tasks.length === 0? 
                <div className="no_items">Nothing to do</div>
                : 
                tasks.map(task => <ToDoCell key={task.id} task={task}/>)}
            </ScrolShell>
        </>
    )
}

export default ToDoBox;

type ToDoCellProps = {
    task: TaskGet;
}

const ToDoCell = ({ task }: ToDoCellProps) => {
    const extraActions = [
        { label: "View", action: () => console.log("view", task.id) },
    ];

    return (
        <div className="ToDoCell">
            <span className="ToDoCell_name">{task.taskName}</span>
            <span className="ToDoCell_deadline">{task.deadLine.toLocaleDateString()}</span>
            <span className="ToDoCell_priority">{task.priority}</span>
            <ActionsMenu entityId={task.id} extraActions={extraActions} />
        </div>
    )
}
