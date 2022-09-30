const Messages = require("../models/messageModel");

module.exports.messagesController = {
    getMessages: async (req, res) => {
        const { from , to } = req.body;

        const messages = await Messages.find({
            users:{
                $all:[from, to]
            }
        }).sort({updatedAt:1});

        const projectedMessages = messages.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                text: msg.text,
            };
        });
        res.json(projectedMessages);
    },
    addMessage:async (req, res) => {
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
    }
}