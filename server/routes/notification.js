const { Router } = require("express");
const router = Router();

const authMiddleware = require("../middlewares/auth");
const notificationController = require("../controllers/notification");

// push noti
// POST /notify
router.post("/notify", authMiddleware, notificationController.pushNofification);

// get noti
// GET /notifications
router.get(
  "/notifications",
  authMiddleware,
  notificationController.getNotifications
);

// make noti as read
// GET /notifications-read/:id
router.get(
  "/notifications-read/:id",
  authMiddleware,
  notificationController.markAsRead
);

// delete noti
// DELETE /notification-delete/:id
router.delete(
  "/notification-delete/:id",
  authMiddleware,
  notificationController.deleteNoti
);

// delete all noti
// DELETE /notification-delete-all
router.delete(
  "/notification-delete-all",
  authMiddleware,
  notificationController.deleteAllNoti
);

module.exports = router;
