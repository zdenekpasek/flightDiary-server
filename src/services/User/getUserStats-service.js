const mongoose = require('mongoose');
const User = mongoose.model('User');
const Mission = mongoose.model('Mission');

const getUserStats = async (_id) => {
  try {
    const stats = {
      totalMissions: 0,
      totalUavs: 0,
      totalFlightTime: 0,
    };

    await User.aggregate([
      {
        $match: {
          _id: _id,
        },
      },

      {
        $project: {
          totalMissions: { $size: '$missions' },
          totalUavs: { $size: '$uavs' },
        },
      },
    ])
      .then(function (res) {
        stats.totalMissions = res[0].totalMissions;
        stats.totalUavs = res[0].totalUavs;
      })
      .catch(function (err) {
        console.log(err);
      });

    await Mission.aggregate([
      {
        $match: {
          _owner: _id,
        },
      },
      {
        $group: {
          _id: null,
          totalFlightTime: { $sum: '$flightTime' },
        },
      },
    ])
      .then(function (res) {
        stats.totalFlightTime = res[0].totalFlightTime;
      })
      .catch(function (err) {
        stats.totalFlightTime = 0;
      });
    return {
      success: true,
      stats,
    };
  } catch (err) {
    return { success: false, stats };
  }
};

module.exports = {
  getUserStats,
};
