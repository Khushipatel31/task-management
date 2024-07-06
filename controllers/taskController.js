const tasks = require("../model/task");
const { CustomHttpError } = require("../utils/customError");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const { default: mongoose } = require("mongoose");

//adding new task
const addTask = catchAsyncErrors(async (req, res, next) => {
    const { title, description, userId, deadline } = req.body;
    if (!title || !description || !userId) {
        return next(new CustomHttpError(400, "Please enter all data"));
    }
    try {
        const task = await tasks.create({
            title,
            description,
            assignedTo: userId,
            deadline
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

const getMyTasks = catchAsyncErrors(async (req, res, next) => {
    const allTasks = await tasks.find({ assignedTo: req.user._id });
    const pendingTasks = [], completedTasks = [], expiredTasks = [];
    allTasks.forEach((task) => {
        const taskDeadline = new Date(task.deadline).getTime();
        const currentTime = Date.now();
        if (task.isCompleted === 1) {
            completedTasks.push(task);
        } else {
            if (taskDeadline > currentTime) {
                pendingTasks.push(task);
            } else {
                expiredTasks.push(task);
            }
        }
    })
    res.status(200).json({
        success: true,
        completedTasks,
        pendingTasks,
        expiredTasks
    });
});


const adminGetTasks = catchAsyncErrors(async (req, res, next) => {
    let id = new mongoose.Types.ObjectId(req.user.id);
    const allTasks = await tasks.find({
        assignedTo: { $ne: req.user.id }
    }).populate("assignedTo");

    let pendingCount = 0;
    let expiredCount = 0;
    let completedCount = 0;

    const tasksWithStatus = allTasks.map((task) => {
        const taskDeadline = new Date(task.deadline).getTime();
        const currentTime = Date.now();
        let status;
        
        if (task.isCompleted === 1) {
            status = "completed";
            completedCount++;
        } else {
            if (taskDeadline > currentTime) {
                status = "pending";
                pendingCount++;
            } else {
                status = "expired";
                expiredCount++;
            }
        }

        return { ...task.toObject(), status };
    });

    res.status(200).json({
        success: true,
        counts: {
            pending: pendingCount,
            expired: expiredCount,
            completed: completedCount
        },
        tasks: tasksWithStatus
    });
});



const updateStatus = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    try {
        const task = await tasks.findById(id);
        if (!task) {
            return res.status(404).json({ error: "No task found with that ID" });
        }
        task.isCompleted = 1;
        await task.save();
        res.status(200).json({ message: "Your task is completed", task });
    } catch (error) {
        console.error("Failed to delete animal:", error);
        return next(new CustomHttpError(500, "Failed to delete task"));
    }
})

module.exports = {
    addTask,
    getTasks,
    updateTask,
    deleteTask,
    updateStatus,
    getMyTasks,
    adminGetTasks
};
