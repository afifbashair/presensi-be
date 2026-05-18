const Meeting =
  require("../models/presensi/meeting.model");

const Course =
  require("../models/presensi/course.model");

const Notification =
  require("../models/auth/notification.model");

const User =
  require("../models/auth/user.model");


// =====================================
// CREATE MEETING
// =====================================

exports.createMeeting =
  async (req, res) => {

    try {

      const meeting =
        await Meeting.create(
          req.body
        );

      // =====================
      // AUTO NOTIFICATION
      // =====================

      const users =
        await User.findAll();

      let notifTitle =
        "Meeting Baru";

      let notifMessage =
        `${meeting.title} telah ditambahkan`;

      // PRESENSI
      if (
        meeting.type ===
        "attendance"
      ) {

        notifTitle =
          "Presensi Dibuka";

        notifMessage =
          `Presensi ${meeting.title} telah dibuka`;
      }

      // MATERI
      if (
        meeting.type ===
        "material"
      ) {

        notifTitle =
          "Materi Baru";

        notifMessage =
          `Materi ${meeting.title} telah tersedia`;
      }

      // BROADCAST TO ALL USER
      for (const user of users) {

        await Notification.create({

          user_id:
            user.id,

          title:
            notifTitle,

          message:
            notifMessage,
        });
      }

      res.json(meeting);

    } catch (err) {

      res.status(500).json({
        message:
          err.message,
      });
    }
  };


// =====================================
// GET MEETING BY COURSE
// =====================================

exports.getByCourse =
  async (req, res) => {

    try {

      const {
        course_id
      } = req.params;

      const data =
        await Meeting.findAll({

          where: {
            course_id
          },

          order: [
            ["start_time", "ASC"]
          ],
        });

      res.json(data);

    } catch (err) {

      res.status(500).json({
        message:
          err.message,
      });
    }
  };


// =====================================
// SEED
// =====================================

exports.seedMeeting =
  async (req, res) => {

    try {

      const courses =
        await Course.findAll();

      for (const course of courses) {

        // PRESENSI
        await Meeting.findOrCreate({

          where: {

            course_id:
              course.id,

            title:
              "Presensi",
          },

          defaults: {

            type:
              "attendance",

            start_time:
              new Date(),

            end_time:
              new Date(),
          },
        });

        // MATERI
        for (
          let i = 1;
          i <= 3;
          i++
        ) {

          await Meeting.findOrCreate({

            where: {

              course_id:
                course.id,

              title:
                `Pertemuan ${i}`,
            },

            defaults: {

              type:
                "material",

              content:
                "https://example.com",

              start_time:
                new Date(),

              end_time:
                new Date(),
            },
          });
        }
      }

      res.json({
        message:
          "Meeting berhasil dibuat",
      });

    } catch (err) {

      res.status(500).json({
        message:
          err.message,
      });
    }
  };


// =====================================
// UPDATE
// =====================================

exports.updateMeeting =
  async (req, res) => {

    try {

      const { id } =
        req.params;

      await Meeting.update(
        req.body,
        {
          where: { id },
        }
      );

      res.json({
        message:
          "Meeting berhasil diupdate",
      });

    } catch (err) {

      res.status(500).json({
        message:
          err.message,
      });
    }
  };


// =====================================
// DELETE
// =====================================

exports.deleteMeeting =
  async (req, res) => {

    try {

      const { id } =
        req.params;

      await Meeting.destroy({
        where: { id },
      });

      res.json({
        message:
          "Meeting berhasil dihapus",
      });

    } catch (err) {

      res.status(500).json({
        message:
          err.message,
      });
    }
  };


// =====================================
// GET ALL MEETINGS
// =====================================

exports.getAllMeetings =
  async (req, res) => {

    try {

      const meetings =
        await Meeting.findAll({

          order: [
            ["start_time", "DESC"]
          ],
        });

      res.json(meetings);

    } catch (err) {

      res.status(500).json({
        message:
          err.message,
      });
    }
  };