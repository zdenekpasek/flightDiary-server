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

    // const uavToUpdate = await user.uavs.findById(uavId);

    const updatedUav = user.update(
      { _id: uavId },
      {
        $set: {
          uavName,
          weight,
          category,
          uav,
          okNumber,
        },
      }
    );

    await user.save();

    return { success: true, updatedUav };
  } catch (err) {
    return { success: false, err };
  }
};

module.exports = {
  updateUav,
};
