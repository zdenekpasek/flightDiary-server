const mongoose = require('mongoose');
const User = mongoose.model('User');
const Mission = mongoose.model('Mission');
const moment = require('moment');

const createMission = async (
  _id,
  missionName,
  name,
  uav,
  gps,
  missionStart,
  missionEnd,
  usedBatteries,
  tmp,
  wind,
  desc
) => {
  try {
    const missionId = new mongoose.Types.ObjectId();
    const mission = new Mission({
      _id: missionId,
      missionName,
      pilot: name,
      uav,
      gps,
      missionStart: moment(missionStart),
      missionEnd: moment(missionEnd),
      flightTime: moment(missionEnd).diff(missionStart, 'minutes'),
      usedBatteries,
      tmp,
      wind,
      desc,
      _owner: _id,
    });

    const user = await User.findById(_id);
    console.log(user);
    user.missions.push({
      _id: missionId,
    });

    await mission.save();
    await user.save();

    return { success: true, mission };
  } catch (err) {
    return { success: false, err };
  }
};

module.exports = {
  createMission,
};
