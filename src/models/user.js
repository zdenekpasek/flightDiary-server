const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const uavSchema = new mongoose.Schema({
  uavName: {
    type: String,
    required: true,
  },
  weight: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  uav: {
    type: String,
    required: true,
  },
  okNumber: {
    type: Number,
    required: true,
  },
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  uavs: [uavSchema],
  missions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Mission' }],
});

// pre save hook
// function misto arrow funkce protoze potrebuji pristup k this
// a this referuje na usera
userSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next();
      }
      user.password = hash;
      next();
    });
  });
});

// bcrypt zavisi na callback funkcich a proto je zde promise
// potrebuji async await
userSchema.methods.comparePassword = function (candidatePassword) {
  const user = this;
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
      if (err) {
        return reject(err);
      }

      if (!isMatch) {
        return reject(false);
      }

      resolve(true);
    });
  });
};

mongoose.model('User', userSchema);
