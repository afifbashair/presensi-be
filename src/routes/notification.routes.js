const router =
  require("express").Router();

const notification =
  require("../controllers/notification.controller");

const auth =
  require("../middlewares/auth.middleware");

const role =
  require("../middlewares/role.middleware");

// USER
router.get(
  "/",
  auth,
  notification.getMyNotifications
);

router.put(
  "/:id/read",
  auth,
  notification.markAsRead
);

router.delete(
  "/:id",
  auth,
  notification.deleteNotification
);

// ADMIN
router.post(
  "/broadcast",
  auth,
  role(["admin", "teacher"]),
  notification.broadcastNotification
);

module.exports = router;