import taskModel from "../models/taskModel.js";
import userModel from "../models/userModel.js";
import { createTransport } from 'nodemailer';
import dotenv from "dotenv";
dotenv.config();

const sendMail = (email, subject, title, description) => {
    var transporter = createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USERNAME,
            pass: process.env.GMAIL_PASSWORD
        }
    });

    var mailOptions = {
        from: 'singhalabhinav639@gmail.com',
        to: email,
        subject: subject,
        html: `<h1>Task added successfully</h1><h2>Title: ${title}</h2><h3>Description: ${description}</h3>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

const addTask = async (req, res) => {
    console.log(req.body);
    const { title, description, priority, dueDate } = req.body;
    const userId = req.user.id;
    const user = await userModel.find({ _id: userId });
    const newTask = new taskModel({ title, description, priority, dueDate, completed: false, userId });
    newTask.save()
        .then(() => {
            sendMail(user[0].email, "Task Added", title, description);
            return res.status(200).json({ message: "Task added successfully" });
        })
        .catch((error) => {
            return res.status(500).json({ message: error.message });
        });
        console.log(newTask);
};

const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, completed, priority, dueDate } = req.body;

    console.log(`Received request to update task ${id} with`, req.body); // Debug log

    try {
        const task = await taskModel.findById(id);
        if (!task) {
            console.log("Task not found"); // Debug log
            return res.status(404).json({ message: "Task not found" });
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.completed = completed !== undefined ? completed : task.completed;
        task.priority = priority || task.priority; // Update the priority
        task.dueDate = dueDate || task.dueDate;

        const updatedTask = await task.save();
        const user = await userModel.findById(task.userId);
        if (user) {
            sendMail(user.email, "Task Updated", title || task.title, description || task.description);
        }

        console.log("Task updated successfully", updatedTask); // Debug log
        res.status(200).json({ message: "Task updated successfully", task: updatedTask });
    } catch (error) {
        console.error("Error updating task:", error.message); // Debug log
        res.status(500).json({ message: error.message });
    }
};

const removeTask = (req, res) => {
    const { id } = req.body;
    console.log("id: ", id);
    taskModel.findByIdAndDelete(id)
        .then(() => res.status(200).json({ message: "Task deleted successfully" }))
        .catch((error) => res.status(501).json({ message: error.message }));
};

// Enhanced getTask with filtering and search functionality
const getTask = async (req, res) => {
    const { priority, completed, search } = req.query; // Get filters and search term from query params
    const userId = req.user.id;

    const query = { userId };
    if (priority) query.priority = priority;
    if (completed) query.completed = completed === 'true'; // Convert 'true'/'false' string to boolean
    if (search) {
        query.$or = [
            { title: { $regex: search, $options: 'i' } }, // Search in title (case-insensitive)
            { description: { $regex: search, $options: 'i' } } // Search in description (case-insensitive)
        ];
    }

    try {
        const tasks = await taskModel.find(query);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { addTask, getTask, removeTask, updateTask };
