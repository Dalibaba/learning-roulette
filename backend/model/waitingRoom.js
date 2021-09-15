const mongoose = require('mongoose');

// Child Referencing: the parent references its children.

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
