const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

router.route("/tasks").post(taskController.addTask).get(taskController.getTasks);
router.route("/tasks/:id").put(taskController.updateTask).delete(taskController.deleteTask);

module.exports = router;
