const mongoose = require('mongoose');
const User = mongoose.model('User');

const getUavs = async (_id) => {
  try {
    const user = await User.findById(_id);

    return { success: true, uavs: user.uavs };
  } catch (err) {
    return { success: false, err };
  }
};

module.exports = {
  getUavs,
};
