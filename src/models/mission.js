const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

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
    type: Number,
  },

  tmp: { type: String },
  wind: { type: String },

  usedBatteries: { type: String },
  desc: { type: String },

  _owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

missionSchema.plugin(mongoosePaginate);

mongoose.model('Mission', missionSchema);
