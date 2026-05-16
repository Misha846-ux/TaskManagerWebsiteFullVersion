import "../../../Styles/ProjectPage/FirstColumm.css"
import Calendar from "../../MultiUsedParts/Calendar"
import TasksCard from "../../MultiUsedParts/TasksCard"

const FirstColumm = () => {
    return (
        <div className="FirstColumm">
            <div className="FirstColummHeading">Project schedule</div>
            <div className="Task_Calendar">
                <Calendar />
            </div>
            <div className="Task_Cards">
                <div className="Card_CompletedTasks">
                    <TasksCard title="COMPLETED TASKS" count={5} />
                </div>
                <div className="Card_PendingTasks">
                    <TasksCard title="PENDING TASKS" count={100} />
                </div>
            </div>
        </div>
    )
}

export default FirstColumm;