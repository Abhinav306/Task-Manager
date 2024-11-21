import React, { useState, useContext } from 'react';
import moment from 'moment';
import TaskContext from '../../context/TaskContext';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'; 
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem } from '@mui/material';
import "./task.css";

function Task({ task, id }) {
    const { dispatch } = useContext(TaskContext);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || '',
        dueDate: task.dueDate || ''
    });

    const handleRemove = (e) => {
        e.preventDefault();
        dispatch({
            type: "REMOVE_TASK",
            id
        });
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // Function to handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Dispatch action to update the task with the new form data
        dispatch({
            type: "UPDATE_TASK",
            id,
            updatedTask: formData
        });
        handleClose(); // Close the dialog after submitting the form
    };

    const handleMarkDone = () => {
        dispatch({
            type: "MARK_DONE",
            id
        });
    };

    return (
        <div className='bg-blue-400 py-4 rounded-lg shadow-md flex items-center justify-center gap-2 mb-3'>
            <div className="mark-done">
                <input type="checkbox" className="checkbox" onChange={handleMarkDone} checked={task.completed} />
            </div>
            <div className="task-info text-slate-900 text-sm w-10/12">
                <h4 className="task-title text-lg capitalize">{task.title}</h4>
                <h5 className="task-description">{task.description}</h5>
                <h6 className="task-priority">Priority: {task.priority}</h6>
                <div className=' italic opacity-60'>
                    {
                        task?.createdAt ? (
                            <p>{moment(task.createdAt).fromNow()}</p>
                        ) : (
                            <p>just now</p>
                        )
                    }
                </div>
            </div>
            <div className="edit-task text-sm text-white">
                <EditIcon
                    style={{ fontSize: 30, cursor: "pointer" }}
                    onClick={handleClickOpen}
                    className="edit-task-btn bg-blue-700 rounded-full border-2 shadow-2xl border-white p-1" />
            </div>
            <div className="remove-task text-sm text-white">
                <DeleteIcon
                    style={{ fontSize: 30, cursor: "pointer" }}
                    onClick={handleRemove}
                    className="remove-task-btn bg-blue-700 rounded-full border-2 shadow-2xl border-white p-1" />
            </div>
            
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Update Task</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Title"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            label="Description"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            multiline
                            rows={4}
                        />
                        <TextField
                            select
                            label="Priority"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                            required
                        >
                            <MenuItem value="Low">Low</MenuItem>
                            <MenuItem value="Medium">Medium</MenuItem>
                            <MenuItem value="High">High</MenuItem>
                        </TextField>
                        <TextField
                            label="Due Date"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type="date"
                            name="dueDate"
                            value={formData.dueDate}
                            onChange={handleChange}
                            required
                        />
                        <DialogActions>
                            <Button onClick={handleClose} color="secondary">
                                Cancel
                            </Button>
                            <Button type="submit" color="primary">
                                Save
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default Task;
