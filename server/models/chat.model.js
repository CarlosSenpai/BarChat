const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({

    latitude: {
        type: Number
    },

    longitude: {
        type: Number
    }
})

const Chat = mongoose.model("Chat", ChatSchema);

module.exports = Chat;