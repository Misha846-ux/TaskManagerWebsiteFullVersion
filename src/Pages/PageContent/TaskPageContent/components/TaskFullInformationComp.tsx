import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import "../styles/Tasks.css";


export default function TaskDetails() {
    const task: any = useLoaderData();
    const navigate = useNavigate();
    const [completed, setCompleted] = useState<boolean>(!!task.completed);
    const [saving, setSaving] = useState(false);

    async function toggleCompleted() {
        const next = !completed;
        setCompleted(next);
        setSaving(true);
        try {
            const res = await fetch(import.meta.env.VITE_Tasks_SERVER_URL +`/${task.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ completed: next }),
            });
            if (!res.ok) {
                setCompleted(!next); // revert on failure
            }
        } catch {
            setCompleted(!next);
        } finally {
            setSaving(false);
        }
    }

    return (
        <div>
            <button onClick={() => navigate(-1)}>Back</button>

            <h2>{task.title ?? "Task"}</h2>

            <div>
                <strong>Due Date:</strong>{" "}
                {task.dueDate ? new Date(task.dueDate).toLocaleString() : "No due date"}
            </div>

            <div>
                <strong>Full Information:</strong>
                <p>{task.fullInformation ?? task.description_full ?? "No details"}</p>
            </div>
            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={completed}
                        onChange={toggleCompleted}
                        disabled={saving}
                    />{" "}
                    Completed
                </label>
            </div>
        </div>
    );
}