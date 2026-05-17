const router = require("express").Router();
const user = require("../controllers/user.controller");
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");

// hanya admin
router.post(
  "/:id/assign-role",
  auth,
  role(["admin"]),
  user.assignRole
);

router.get(
  "/",
  auth,
  role(["admin", "teacher"]),
  user.getUsers
);



module.exports = router;