import React, { useState, useContext } from 'react';
import Task from './Task/Task';
import TaskContext from '../context/TaskContext';

const UpdateTask = ({ task, onSave }) => {
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [isUpdating, setIsUpdating] = useState(false);

    const handleUpdate = async (e) => {
        e.preventDefault();
        console.log("Save button clicked");
        try {
            await onSave(task._id, { title, description });
            console.log("Task updated successfully");
            setIsUpdating(false);
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    return isUpdating ? (
        <form onSubmit={handleUpdate}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
            ></textarea>
            <button type="submit">Save</button>
            <button type="button" onClick={() => setIsUpdating(false)}>Cancel</button>
        </form>
    ) : (
        <button onClick={() => setIsUpdating(true)}>Update Task</button>
    );
};

const Active = () => {
    const { tasks, updateTask } = useContext(TaskContext);

    const handleSave = async (id, updatedTask) => {
        console.log(`Updating task ${id} with `, updatedTask);
        await updateTask(id, updatedTask);
    };

    return (
        <div>
            {tasks.length !== 0 ? (
                tasks.map((task, index) => {
                    return (
                        !task.completed && (
                            <div key={index}>
                                <Task task={task} id={index} />
                                {/* <UpdateTask task={task} onSave={handleSave} /> */}
                            </div>
                        )
                    );
                })
            ) : (
                <h1>No Task Found</h1>
            )}
        </div>
    );
};

export default Active;
