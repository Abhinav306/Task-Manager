import mongoose from "mongoose";

const taskInstance = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming your user model is called 'User'
        required: true
    },
    priority: {
        type: String,
        enum: {
            values: ['High', 'Medium', 'Low'],
            message: 'Priority must be either High, Medium, or Low',
        },
        required: [true, 'Priority is required'],
    },
    dueDate: {
        type: Date,
        required: [true, 'Due date is required'],
    },
    completed: { type: Boolean, required: true, default: false }
}, { timestamps: true });

const taskModel = mongoose.model("Task", taskInstance);
export default taskModel;
