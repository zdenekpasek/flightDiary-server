const mongoose = require('mongoose');
const User = mongoose.model('User');
const Mission = mongoose.model('Mission');

const getMissions = async (_id, page, limit) => {
  //   let missions = [];
  //   try {
  //     await User.findOne({ _id: _id })
  //       .lean()
  //       .populate('missions')
  //       .then((usr) => {
  //         console.log(usr);
  //         Object.assign(missions, usr.missions);
  //       });
  //     return { success: true, missions };
  //   } catch (err) {
  //     return { success: false, err };
  //   }
  // };
  try {
    let missions = {};
    var options = {
      page,
      limit,
      lean: true,
    };
    await Mission.paginate({ _owner: _id }, options, function (err, result) {
      Object.assign(missions, result);
    });
    return { success: true, missions };
  } catch (err) {
    return { success: false, err };
  }
};

module.exports = {
  getMissions,
};
