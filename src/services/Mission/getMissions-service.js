const mongoose = require('mongoose');
const Mission = mongoose.model('Mission');

const getMissions = async (_id, page, limit) => {
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
