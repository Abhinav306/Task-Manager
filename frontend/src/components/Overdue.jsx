import React, { useContext } from "react";
import moment from "moment";
import TaskContext from "../context/TaskContext";

function Overdue() {
    const { tasks } = useContext(TaskContext);

    // If no tasks are available, return a message
    if (!tasks || tasks.length === 0) {
        return <h1>No Overdue Tasks Found</h1>;
    }

    // Log the tasks array to debug if tasks are available
    console.log("Tasks:", tasks);

    return (
        <div>
            {
                tasks.map((task, index) => {
                    // Ensure task has a valid dueDate and is overdue
                    const dueDate = new Date(task.dueDate);
                    const isOverdue = dueDate && dueDate < new Date();

                    // Log the dueDate for each task to verify it's correct
                    console.log(`Task ${index} Due Date: ${task.dueDate} - Is Overdue: ${isOverdue}`);

                    // Render the task if it is overdue
                    return (
                        isOverdue && (
                            <div
                                key={index}
                                className="py-4 rounded-lg shadow-md flex items-center justify-center gap-2 mb-3 bg-red-200"
                            >
                                <div className="task-info text-slate-900 text-sm w-10/12">
                                    <h4 className="task-title text-lg capitalize">{task.title}</h4>
                                    <p className="task-description">{task.description}</p>
                                    <div className="italic opacity-60">
                                        <p className="text-red-600">Overdue</p>
                                        <p>{moment(task.dueDate).fromNow()}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    );
                })
            }
        </div>
    );
}

export default Overdue;
