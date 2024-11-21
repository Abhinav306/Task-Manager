import React, { useContext } from 'react';
import Task from './Task/Task';
import TaskContext from '../context/TaskContext';

function AllTask() {
    const { tasks, updateTask } = useContext(TaskContext);  // Ensure updateTask is accessed from context

    // const handleSetPriority = (taskId, priority) => {
    //     console.log(`Setting priority for task ${taskId} to ${priority}`); // Log to check if called
    //     updateTask(taskId, { priority })
    //         .then(response => {
    //             console.log('Task priority updated successfully', response); // Log to check successful response
    //         })
    //         .catch(error => {
    //             console.error('Error updating task priority', error); // Log to check errors
    //         });
    // };

    return (
        <div>
            {tasks.length !== 0 ? (
                tasks.map((task, index) => (
                    <div key={index}>
                        <Task task={task} id={index} />
                        {/* <div className="set-priority">
                            <label htmlFor="priority">Set Priority: </label>
                            <select
                                id="priority"
                                value={task.priority || ''}
                                onChange={(e) => handleSetPriority(task._id, e.target.value)}
                            >
                                <option value="">None</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div> */}
                    </div>
                ))
            ) : (
                <h1>No Task Found</h1>
            )}
        </div>
    );
}

export default AllTask;
