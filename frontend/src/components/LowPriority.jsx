import React, { useContext } from "react";
import TaskContext from "../context/TaskContext";
import Task from "./Task/Task";
 // Assuming you have a Task component to display the task details.

function LowPriority() {
    const { tasks } = useContext(TaskContext);

    // Filter tasks by "Low" priority
    const lowPriorityTasks = tasks.filter((task) => task.priority === 'Low');

    return (
        <div>
            {lowPriorityTasks.length > 0 ? (
                lowPriorityTasks.map((task, index) => (
                    <Task key={index} task={task} id={index} />
                ))
            ) : (
                <h1>No Low Priority Tasks Found</h1>
            )}
        </div>
    );
}

export default LowPriority;
