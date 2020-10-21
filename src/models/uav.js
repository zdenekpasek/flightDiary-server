const mongoose = require('mongoose');

const uavSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  uav: {
    type: String,
    required: true,
  },
  ok: {
    type: Number,
    required: true,
  },
  weight: {
    type: String,
  },
  category: {
    type: String,
  },
});

mongoose.model('Uav', uavSchema);
