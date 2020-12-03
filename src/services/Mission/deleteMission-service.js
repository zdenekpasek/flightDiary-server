const mongoose = require('mongoose');
const Mission = mongoose.model('Mission');
const User = mongoose.model('User');

const deleteMission = async (_id, missionId) => {
  // delete mission reference in user collection
  try {
    User.findOne({ _id: _id }, function (err, user) {
      for (var i = 0; i <= user.missions.length; i++) {
        if (String(user.missions[i]) == String(missionId)) {
          user.missions.remove(missionId);
          break;
        }
      }
      user.save();
    });
  } catch (err) {
    console.log(err);
  }

  // delete mission in mission collection
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
