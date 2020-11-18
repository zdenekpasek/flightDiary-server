const mongoose = require('mongoose');
const User = mongoose.model('User');

const updateUav = async (
  _id,
  uavId,
  uavName,
  weight,
  category,
  uav,
  okNumber
) => {
  try {
    const user = await User.findById(_id);
    const uavById = await user.uavs.id(uavId);

    uavById.uavName = uavName;
    uavById.weight = weight;
    uavById.category = category;
    uavById.uav = uav;
    uavById.okNumber = okNumber;
    user.save();

    return { success: true };
  } catch (err) {
    return { success: false, err };
  }
};

module.exports = {
  updateUav,
};
