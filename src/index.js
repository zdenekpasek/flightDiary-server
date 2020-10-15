const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoute = require('./routes/authRoute');

const app = express();

app.use(bodyParser.json());
app.use(authRoute);

const mongoUri =
  'mongodb+srv://admin:774146480admin@cluster0.2altz.mongodb.net/<dbname>?retryWrites=true&w=majority';

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
  console.log('Connected to mongo instance');
});
mongoose.connection.on('error', (err) => {
  console.log('Error connecting to mongo', err);
});

app.get('/', (req, res) => {
  res.send('hello there');
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
