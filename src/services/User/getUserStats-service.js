const mongoose = require('mongoose');
const User = mongoose.model('User');
const Mission = mongoose.model('Mission');

const getUserStats = async (_id) => {
  try {
    User.aggregate([
      {
        $match: {
          _id: _id,
        },
      },

      {
        $project: {
          total: { $size: '$missions' },
        },
      },
    ]).then(function (res) {
      console.log(res);
    });

    return {
      success: true,
    };
  } catch (err) {
    return { success: false, err };
  }
};

module.exports = {
  getUserStats,
};
