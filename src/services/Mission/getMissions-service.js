const mongoose = require('mongoose');
const User = mongoose.model('User');

const getMissions = async (_id) => {
  let missions = [];
  try {
    await User.findOne({ _id: _id })
      .populate('missions')
      .then((usr) => {
        Object.assign(missions, usr.missions);
      });

    return { success: true, missions };
  } catch (err) {
    return { success: false, err };
  }
};

module.exports = {
  getMissions,
};
