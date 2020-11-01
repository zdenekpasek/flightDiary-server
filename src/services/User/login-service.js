const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });

  if (user) {
    try {
      await user.comparePassword(password);
      const token = jwt.sign({ userId: user._id }, 'secretkey');
      return { success: true, token };
    } catch (err) {
      return { success: false, err: 'Invalid email or password' };
    }
  } else {
    return { sucess: false, err: 'Invalid email or password' };
  }
};

module.exports = {
  loginUser,
};
