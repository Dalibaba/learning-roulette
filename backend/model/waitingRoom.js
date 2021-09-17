const mongoose = require('mongoose');

const WaitingRoomSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  language: {
    type: String,
    required: true,
    enum: ['english', 'spanish'],
  }
});

module.exports = mongoose.model(
  'WaitingRoom', WaitingRoomSchema
);
