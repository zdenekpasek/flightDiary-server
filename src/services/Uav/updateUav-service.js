const mongoose = require('mongoose');
const { use } = require('../../routes/authRoute');
const User = mongoose.model('User');
const Mission = mongoose.model('Mission');

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

    const oldUavName = uavById.uavName;

    Mission.updateMany(
      { _owner: _id, uav: oldUavName },
      {
        $set: {
          uav: uavName,
        },
      }
    ).exec((err, missions) => {
      if (err) throw err;
      console.log(missions);
    });

    uavById.uavName = uavName;
    uavById.weight = weight;
    uavById.category = category;
    uavById.uav = uav;
    uavById.okNumber = okNumber;
    user.save();

    return { success: true, uavs: user.uavs };
  } catch (err) {
    return { success: false, err };
  }
};

module.exports = {
  updateUav,
};
