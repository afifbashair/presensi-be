const router = require("express").Router();
const campus = require("../controllers/campus.controller");
const auth = require("../middlewares/auth.middleware");

// semua protected
router.post("/", auth, campus.createCampus);
router.get("/", auth, campus.getAllCampus);
router.get("/:id", auth, campus.getCampusById);
router.put("/:id", auth, campus.updateCampus);
router.delete("/:id", auth, campus.deleteCampus);

module.exports = router;