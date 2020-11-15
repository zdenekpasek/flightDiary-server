const mongoose = require('mongoose');

const missionSchema = new mongoose.Schema({
  missionName: {
    type: String,
    required: true,
  },
  pilot: {
    type: String,
    required: true,
  },
  uav: {
    type: String,
    required: true,
  },
  gps: {
    type: String,
    required: true,
  },

  missionStart: {
    type: Date,
    required: true,
  },

  missionEnd: {
    type: Date,
    required: true,
  },

  flightTime: {
    type: String,
  },

  tmp: { type: String },
  wind: { type: String },

  usedBatteries: { type: String },
  desc: { type: String },

  _owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

mongoose.model('Mission', missionSchema);
