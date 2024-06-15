const tasks = require("../model/task");
const { CustomHttpError } = require("../utils/customError");
const catchAsyncErrors = require("../middleware/catchAsyncError");

//adding new task
const addTask = catchAsyncErrors(async (req, res, next) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return next(new CustomHttpError(400, "Please enter all data"));
    }
    try {
        const task = await tasks.create({
            title,
            description
        });
        res.status(201).json({ message: "Task created successfully", task });
    } catch (error) {
        return next(new CustomHttpError(500, "Failed to create new task"));
    }
});

//updating task
const updateTask = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const { title, description, isCompleted } = req.body;
    if (!title || !description) {
        return next(new CustomHttpError(400, "Please enter all data"));
    }
    try {
        const updatedtask = await tasks.findByIdAndUpdate(
            id,
            { title, description, isCompleted },
            { new: true }
        );
        if (!updatedtask) {
            return next(new CustomHttpError(404, "Task not found"));
        }
        res.status(200).json({ message: "Task updated successfully", updatedtask });
    } catch (error) {
        console.error(error);
        return next(new CustomHttpError(500, "Failed to update task"));
    }
});

//deleting task
const deleteTask = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    try {
        const task = await tasks.findById(id);
        if (!task) {
            return res.status(404).json({ error: "No task found with that ID" });
        }
        await tasks.findByIdAndDelete(id);
        res.status(200).json({ message: "Task deleted successfully", task });
    } catch (error) {
        console.error("Failed to delete animal:", error);
        return next(new CustomHttpError(500, "Failed to delete task"));
    }
});

//getting all tasks
const getTasks = catchAsyncErrors(async (req, res, next) => {
    const allTasks = await tasks.find({});
    res.status(200).json({
        success: true,
        count: allTasks.length,
        tasks: allTasks
    });
});

module.exports = {
    addTask,
    getTasks,
    updateTask,
    deleteTask
};
