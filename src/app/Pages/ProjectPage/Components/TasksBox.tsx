import { useState } from "react"
import "../../../Styles/ProjectPage/TasksBox.css"

type TaskStub = {
    id: string
    taskName: string
    description: string
    priority: string
    due: string
    completed: boolean
}

const placeholderTasks: TaskStub[] = [
    {
        id: "1",
        taskName: "Design review",
        description: "Review the project calendar and adjust the sprint plan.",
        priority: "High",
        due: "Today",
        completed: false,
    },
    {
        id: "2",
        taskName: "Client sync",
        description: "Prepare update slides and confirm next milestone.",
        priority: "Medium",
        due: "Tomorrow",
        completed: false,
    },
    {
        id: "3",
        taskName: "Backend stub",
        description: "Use placeholder data now, actual API will connect later.",
        priority: "Low",
        due: "This week",
        completed: true,
    },
    {
        id: "4",
        taskName: "Update docs",
        description: "Align the new project page layout with the old design.",
        priority: "Medium",
        due: "Friday",
        completed: false,
    },
]

const TaskCell = ({ task }: { task: TaskStub }) => {
    return (
        <div className={`task-item ${task.completed ? "task-completed" : ""}`}>
            <div className="task-title">{task.taskName}</div>
            <p className="task-meta">{task.description}</p>
            <div className="task-row">
                <span className="task-tag">{task.priority}</span>
                <span className="task-due">{task.due}</span>
            </div>
            <div className="task-actions">
                <button className="task-button">View</button>
                <button className="task-button secondary">Complete</button>
            </div>
        </div>
    )
}

const TasksBox = () => {
    const [filter, setFilter] = useState("All")

    const visibleTasks = placeholderTasks.filter((task) => {
        if (filter === "Active") return !task.completed
        if (filter === "Completed") return task.completed
        return true
    })

    return (
        <div className="TasksBox">
            <div className="TasksBoxPanel">
                <div className="TasksBoxTitle">Tasks board</div>
                <div className="TasksBoxControls">
                    <div className="TasksBoxButtons">
                        {['All', 'Active', 'Completed'].map((label) => (
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
                {visibleTasks.map((task) => (
                    <TaskCell key={task.id} task={task} />
                ))}
            </div>
        </div>
    )
}

export default TasksBox;