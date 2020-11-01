const mongoose = require('mongoose');
const User = mongoose.model('User');

const createUav = async (_id, uavName, weight, category, uav, okNumber) => {
  try {
    const user = await User.findById(_id);
    user.uavs.push({ uavName, weight, category, uav, okNumber });
    await user.save();

    return { success: true, uavs: user.uavs };
  } catch (err) {
    return { success: false, err };
  }
};

module.exports = {
  createUav,
};
