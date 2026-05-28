const router =
  require("express").Router();

const {
  chatAI,
} = require(
  "../controllers/ai.controller"
);



router.post(
  "/chat",
  chatAI
);

module.exports = router;