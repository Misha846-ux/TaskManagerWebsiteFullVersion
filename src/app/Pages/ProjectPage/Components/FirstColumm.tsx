import "../../../Styles/ProjectPage/FirstColumm.css"
import { useEffect, useState } from "react"
import Calendar from "../../MultiUsedParts/Calendar"
import TasksCard from "../../MultiUsedParts/TasksCard"
import { getMe } from "../../../../Infrastructure/ControllersMethods/UserControllerMethods"
import { getTasksByUserId } from "../../../../Infrastructure/ControllersMethods/TaskControllerMethods"

const FirstColumm = () => {

    const [compTasks, setCompTasks] = useState<number>(0);
        const [pendTasks, setPendTasks] = useState<number>(0);
    
        useEffect(() => {
            getMe().then((me) => {
                getTasksByUserId(me.id).then((data) => {
                    data.map((task)=>{
                        if(task.status == "Completed"){
                            setCompTasks(prev => prev + 1);
                        }
                        else{
                            setPendTasks(prev => prev + 1);
                        }
                    });
                });
            });
        }, [])

    return (
        <div className="FirstColumm">
            <div className="Task_Calendar">
                <Calendar />
            </div>
            <div className="Task_Cards">
                <div className="Card_CompletedTasks">
                    <TasksCard title="COMPLETED TASKS" count={compTasks} />
                </div>
                <div className="Card_PendingTasks">
                    <TasksCard title="PENDING TASKS" count={pendTasks} />
                </div>
            </div>
        </div>
    )
}

export default FirstColumm;