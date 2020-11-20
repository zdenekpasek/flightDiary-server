const mongoose = require('mongoose');
const Mission = mongoose.model('Mission');
const User = mongoose.model('User');

const deleteMission = async (_id, missionId) => {
  // TODO: delete ref mission in User, pre remove hook
  try {
    Mission.findOne({
      _id: missionId,
    })
      .then(function (result) {
        result.remove();
        result.save();
      })
      .catch(function (err) {
        return { success: false, err };
      });

    return { success: true };
  } catch (err) {
    return { success: false, err };
  }
};

module.exports = {
  deleteMission,
};
