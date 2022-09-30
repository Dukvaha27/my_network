const { Router } = require("express");

const router = Router();

router.use("/", require("./auth.route"));
router.use("/msg", require("./messagesRoute"));

module.exports = router;
