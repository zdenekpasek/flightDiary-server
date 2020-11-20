const mongoose = require('mongoose');
const User = mongoose.model('User');

const deleteUav = async (_id, uavId) => {
  try {
    User.findOne(
      {
        'uavs._id': uavId,
      },
      function (err, result) {
        if (err) throw err;
        result.uavs.id(uavId).remove();
        result.save();
      }
    );

    return { success: true };
  } catch (err) {
    return { success: false, err };
  }
};

module.exports = {
  deleteUav,
};
