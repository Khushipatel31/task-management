const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router
  .route("/tasks")
  .post(taskController.addTask)
  .get(taskController.getTasks);
router
  .route("/tasks/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), taskController.updateTask)
  .delete(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    taskController.deleteTask
  );
router
  .route("/task/updateStatus/:id")
  .put(isAuthenticatedUser, taskController.updateStatus);

module.exports = router;
