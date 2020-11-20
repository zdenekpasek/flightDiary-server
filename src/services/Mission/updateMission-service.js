const mongoose = require('mongoose');
const { use } = require('../../routes/authRoute');
const User = mongoose.model('User');
const Mission = mongoose.model('Mission');
const moment = require('moment');

const updateMission = async (
  _id,
  missionId,
  missionName,
  uav,
  missionStart,
  missionEnd,
  usedBatteries,
  desc
) => {
  try {
    const mission = await Mission.findById(missionId);

    mission.missionName = missionName;
    mission.uav = uav;
    mission.missionStart = missionStart;
    mission.missionEnd = missionEnd;
    mission.usedBatteries = usedBatteries;
    mission.desc = desc;
    mission.flightTime = moment(missionEnd).diff(missionStart, 'minutes');
    mission.save();

    return { success: true, mission };
  } catch (err) {
    return { success: false, err };
  }
};

module.exports = {
  updateMission,
};
