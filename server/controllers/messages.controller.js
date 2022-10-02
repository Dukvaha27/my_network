const Messages = require("../models/messageModel");

module.exports.messagesController = {
  getMessages: async (req, res) => {
    const { from, to } = req.body;

    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        id: msg._id,
        fromSelf: msg.sender.toString() === from,
        text: msg.text,
        isRead: msg.isRead,
      };
    });
    res.json(projectedMessages);
  },
  addMessage: async (req, res) => {
    try {
      const { from, to, text } = req.body;
      const data = await Messages.create({
        text,
        users: [from, to],
        sender: from,
      });

      if (data) return res.json({ msg: "Message added successfully." });
      else return res.json({ msg: "Failed to add message to the database" });
    } catch (ex) {
      return res.json(String(ex));
    }
  },
  readMessage: async (req, res) => {
    try {
      const { to, text } = req.body;

      const messages = await Messages.find({
        users: {
          $all: [to],
        },
      });

      const messagesObj = messages.reduce((acc, next) => {
        if (!acc[next._id]) {
          acc[next._id] = next;
        }
        return acc;
      }, {});

      if (messagesObj?.[text]) {
        messagesObj[text].isRead = to !== messagesObj[text].sender.toString();
        await Messages.findByIdAndUpdate(messagesObj[text], {
          isRead: to !== messagesObj[text].sender.toString(),
        });
      }

      return res.json(messagesObj);
    } catch (e) {
      return res.json({ message: "Error on read messages", error: String(e) });
    }
  },
};
