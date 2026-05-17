const router = require("express").Router();
const meeting = require("../controllers/meeting.controller");
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");

router.post("/", auth, meeting.createMeeting);
router.get("/course/:course_id", auth, meeting.getByCourse);
router.post("/seed", meeting.seedMeeting);
router.post("/", auth, role(["teacher", "admin"]), meeting.createMeeting);
router.put("/:id", auth, role(["teacher", "admin"]), meeting.updateMeeting);
router.delete("/:id", auth, role(["admin"]), meeting.deleteMeeting);
router.get("/", auth, meeting.getAllMeetings);

module.exports = router;