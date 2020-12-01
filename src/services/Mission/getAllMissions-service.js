const mongoose = require('mongoose');
const User = mongoose.model('User');

const getAllMissions = async (_id, page, limit) => {
  let missions = [];
  try {
    await User.findOne({ _id: _id })
      .lean()
      .populate('missions')
      .then((usr) => {
        console.log(usr);
        Object.assign(missions, usr.missions);
      });
    return { success: true, missions };
  } catch (err) {
    return { success: false, err };
  }
};

module.exports = {
  getAllMissions,
};
