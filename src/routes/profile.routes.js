const router = require("express").Router();

const profile =
  require("../controllers/profile.controller");

const auth =
  require("../middlewares/auth.middleware");

router.get("/me", auth, profile.getMyProfile);

router.put("/me", auth, profile.updateProfile);

module.exports = router;