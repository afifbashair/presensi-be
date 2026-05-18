const Notification =
  require("../models/auth/notification.model");

const User =
  require("../models/auth/user.model");

// GET MY NOTIFICATIONS
exports.getMyNotifications =
  async (req, res) => {

    try {

      const user_id =
        req.user.id;

      const data =
        await Notification.findAll({
          where: { user_id },

          order: [
            ["createdAt", "DESC"]
          ],
        });

      res.json(data);

    } catch (err) {

      res.status(500).json({
        message: err.message,
      });
    }
  };

// MARK AS READ
exports.markAsRead =
  async (req, res) => {

    try {

      const { id } =
        req.params;

      await Notification.update(
        {
          is_read: true,
        },
        {
          where: { id },
        }
      );

      res.json({
        message:
          "Notification updated",
      });

    } catch (err) {

      res.status(500).json({
        message: err.message,
      });
    }
  };

// DELETE
exports.deleteNotification =
  async (req, res) => {

    try {

      const { id } =
        req.params;

      await Notification.destroy({
        where: { id },
      });

      res.json({
        message:
          "Notification deleted",
      });

    } catch (err) {

      res.status(500).json({
        message: err.message,
      });
    }
  };

// BROADCAST
exports.broadcastNotification =
  async (req, res) => {

    try {

      const {
        title,
        message,
      } = req.body;

      const users =
        await User.findAll();

      for (const user of users) {

        await Notification.create({
          user_id: user.id,

          title,

          message,
        });
      }

      res.json({
        message:
          "Broadcast berhasil",
      });

    } catch (err) {

      res.status(500).json({
        message: err.message,
      });
    }
  };