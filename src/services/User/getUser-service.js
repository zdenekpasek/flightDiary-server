const mongoose = require('mongoose');
const User = mongoose.model('User');

const getUserById = async (_id) => {
  try {
    const user = await User.findById(_id);

    return {
      success: true,
      user: {
        name: user.name,
        email: user.email,
      },
    };
  } catch (err) {
    return { success: false, err };
  }
};

module.exports = {
  getUserById,
};
