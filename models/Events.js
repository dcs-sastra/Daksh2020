const { Schema, model } = require('mongoose');

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  description: {
    type: String,
    required: true
  },
  eventDate: {
    type: Date,
    required: true
  },
  poster: {
    type: String,
    required: true
  },
  venue: {
    type: String,
    required: true
  }
}, { timestamps: true });


const eventModel = model('events', eventSchema);

module.exports = eventModel;
