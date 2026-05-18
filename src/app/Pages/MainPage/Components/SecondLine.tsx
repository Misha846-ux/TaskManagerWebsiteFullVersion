import { useEffect, useState } from "react"
import "../../../Styles/MultiUsedStyles/MainPageLines.css"
import Calendar from "../../MultiUsedParts/Calendar"
import TasksCard from "../../MultiUsedParts/TasksCard"
import Project_Worked from "./Project_Worked"
import { getMe } from "../../../../Infrastructure/ControllersMethods/UserControllerMethods"
import { getTasksByUserId } from "../../../../Infrastructure/ControllersMethods/TaskControllerMethods"

const SecondLine = () => {

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
        <div className="Line">
            <div className="HalfLine">
                <div>
                    <Calendar />
                </div>
                <div>
                    <TasksCard title='COMPLETED TASKS' count={compTasks}/>
                    <TasksCard title='PENDING TASKS' count={pendTasks}/>
                </div>
            </div>
            <div className="HalfLine">
                <Project_Worked />
            </div>
        </div>
    )
}

export default SecondLine;