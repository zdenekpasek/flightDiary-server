const mongoose = require('mongoose');

const missionSchema = new mongoose.Schema({
  name: {
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
  GPS: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  weather: {
    tmp: { type: String },
    wind: { type: String },
  },
  battery: { type: String },
  desc: { type: String },
});

mongoose.model('Mission', missionSchema);
