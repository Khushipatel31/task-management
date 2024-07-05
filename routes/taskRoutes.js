const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const { isAuthenticatedUser, authorizeRoles,verify } = require("../middleware/auth");


router.route("/verify").get(isAuthenticatedUser,verify);

router
  .route("/tasks")
  .post(isAuthenticatedUser,authorizeRoles("admin"),taskController.addTask)
  .get(isAuthenticatedUser,taskController.getTasks);
router.route("/getMyTasks").get(isAuthenticatedUser,taskController.getMyTasks)
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
