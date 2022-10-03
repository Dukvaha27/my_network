const { Router } = require("express");
const { messagesController } = require("../controllers/messages.controller");


const router = Router();

router.post("/addMsg", messagesController.addMessage);
router.post("/getMsg", messagesController.getMessages);
router.get("/getMsgAll", messagesController.getMessagesAll);
router.post("/readMsg/", messagesController.readMessage);

module.exports = router;
