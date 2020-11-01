const mongoose = require('mongoose');
const config = require('./config');

const mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

mongoose.Promise = global.Promise;

mongoose
  .connect(config.dbUrl, mongooseOptions)
  .then(() => {
    console.log('Db connection successful');

    const ExpressLoader = require('./loaders/Express');
    new ExpressLoader();
  })
  .catch((err) => {
    console.log(err);
  });
