import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import taskReducer from '../reducer/taskReducer';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, dispatch] = useReducer(taskReducer, []);

    // Fetch tasks when component mounts
    const fetchTasks = async () => {
        try {
            const response = await axios.get('/api/tasks'); // Update this URL as needed
            const fetchedTasks = response.data.tasks;
            dispatch({ type: 'SET_TASKS', payload: fetchedTasks });
        } catch (error) {
            console.error('Error fetching tasks', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const updateTask = async (id, updatedTask) => {
        console.log(`Updating task ${id} with`, updatedTask);
        try {
            const response = await axios.put(`/api/task/updateTask/${id}`, updatedTask);
            const updatedTaskFromServer = response.data.task;
            dispatch({ type: 'UPDATE_TASK', payload: updatedTaskFromServer });
            console.log('Task updated successfully');
        } catch (error) {
            console.error('Error updating task', error);
        }
    };

    return (
        <TaskContext.Provider value={{ tasks, updateTask, dispatch }}>
            {children}
        </TaskContext.Provider>
    );
};

export default TaskContext;
