const mongoose = require('mongoose');
const Mission = mongoose.model('Mission');

const getMission = async (missionId) => {
  let mission = {};
  try {
    await Mission.findOne({ _id: missionId })
      .lean()
      .then((ms) => {
        console.log(ms);
        Object.assign(mission, ms);
      });
    return { success: true, mission };
  } catch (err) {
    return { success: false, err };
  }
};

module.exports = {
  getMission,
};
