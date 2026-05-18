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

router.post(
  "/",
  auth,
  role(["admin"]),
  user.createUser
);

router.delete(
  "/:id",
  auth,
  role(["admin"]),
  user.deleteUser
);



module.exports = router;