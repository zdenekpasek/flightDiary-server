const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');

const createUser = async (name, email, password) => {
  try {
    const user = new User({ name, email, password });
    await user.save();

    const token = jwt.sign({ userId: user._id }, 'secretkey');
    return { success: true, token };
  } catch (err) {
    return { success: false, err };
  }
};

module.exports = {
  createUser,
};
