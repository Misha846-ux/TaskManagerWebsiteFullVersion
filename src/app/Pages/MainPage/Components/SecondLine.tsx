import "../../../Styles/MultiUsedStyles/MainPageLines.css"
import Calendar from "../../MultiUsedParts/Calendar"
import TasksCard from "../../MultiUsedParts/TasksCard"
import Project_Worked from "./Project_Worked"

const SecondLine = () => {

    return (
        <div className="Line">
            <div className="HalfLine">
                <div>
                    <Calendar />
                </div>
                <div>
                    <TasksCard title='COMPLETED TASKS' count={0.1}/>
                    <TasksCard title='PENDING TASKS' count={100}/>
                </div>
            </div>
            <div className="HalfLine">
                <Project_Worked />
            </div>
        </div>
    )
}

export default SecondLine;