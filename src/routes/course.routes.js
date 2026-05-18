const router = require("express").Router();
const course = require("../controllers/course.controller");
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");

// PUBLIC / USER
router.get(
  "/",
  auth,
  course.getCourses
);

// ADMIN
router.post(
  "/",
  auth,
  role(["admin", "teacher"]),
  course.createCourse
);

router.put(
  "/:id",
  auth,
  role(["admin", "teacher"]),
  course.updateCourse
);

router.delete(
  "/:id",
  auth,
  role(["admin"]),
  course.deleteCourse
);

module.exports = router;