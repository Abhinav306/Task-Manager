import React, { useContext } from 'react';
import TaskContext from '../context/TaskContext';
import Task from './Task/Task'; // Assuming you have a Task component to display task details

function HighPriority() {
    const { tasks } = useContext(TaskContext);

    // Filter tasks by "High" priority
    const highPriorityTasks = tasks.filter((task) => task.priority === 'High');

    return (
        <div>
            {highPriorityTasks.length > 0 ? (
                highPriorityTasks.map((task, index) => (
                    <Task key={index} task={task} id={index} />
                ))
            ) : (
                <h1>No High Priority Tasks Found</h1>
            )}
        </div>
    );
}

export default HighPriority;
