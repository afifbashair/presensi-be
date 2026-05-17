const router = require("express").Router();
const course = require("../controllers/course.controller");
const auth = require("../middlewares/auth.middleware");

router.get("/", auth, course.getAll);

// 🔥 hanya dipakai sekali untuk isi data
router.post("/seed", course.seed);

module.exports = router;