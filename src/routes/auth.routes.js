const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// REGISTER & LOGIN
router.post("/register", authController.register);
router.post("/login", authController.login);

// GET CURRENT USER
router.get("/me", authMiddleware, authController.getMe);

module.exports = router;