const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = new User({ name, email, password });
    await user.save();

    const token = jwt.sign({ userId: user._id }, 'secretkey');
    res.send({ token });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  {
    !email || !password
      ? res.status(422).send({ err: 'Must provide email and password.' })
      : null;
  }

  const user = await User.findOne({ email });

  {
    !user ? res.status(422).send({ err: 'Invalid email or password.' }) : null;
  }

  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, 'secretkey');
    res.send({ token });
  } catch (err) {
    return res.status(422).send('Invalid email or password.');
  }
});

module.exports = router;
