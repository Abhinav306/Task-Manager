import express from "express";
import { addTask, getTask, removeTask, updateTask } from "../controllers/taskController.js";
import requireAuth from "../middleware/requireAuth.js";
const router = express.Router();

router.post("/addTask", requireAuth, addTask);
router.get("/getTask", requireAuth, getTask);  // Updated to use query params for filtering and search
router.put("/updateTask/:id", requireAuth, updateTask);
router.delete("/removeTask", requireAuth, removeTask); // Changed to DELETE for proper RESTful API

export default router;
