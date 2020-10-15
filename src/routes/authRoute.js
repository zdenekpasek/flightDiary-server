const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    res.send({ fullName, email, password });
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
