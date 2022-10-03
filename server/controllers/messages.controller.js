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
        toId:to,
        id: msg._id,
        fromSelf: msg.sender.toString() === from,
        text: msg.text,
        isRead: msg.isRead,
      };
    });
    res.json(projectedMessages);
  },
  getMessagesAll:async(req, res) => {
    try  {
      const messages = await Messages.find();

      return res.json(messages);
    }catch (e) {
      return res.json({message:'ошибка при получении всех сообщений', error:e.toString()})
    }
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
      const { from, to } = req.body; // from : id отправителя - to : id собеседника

      // находим переписку from - to
      const messages = await Messages.find({
        users: {
          $all: [from, to],
        },
      });

      // изменяем включи смс-ок isRead
      for (const message of messages) {
        if (!message.isRead && message.sender.toLocaleString() === from) {
          await Messages.findByIdAndUpdate(message._id, {
            isRead: true,
          });
        }
      }

      return res.json("Отметить прочитанные сообщения!");
    } catch (e) {
      return res.json({ message: "Error on read messages", error: String(e) });
    }
  },
};
