const { createUser } = require('../services/User/signup-service');
const { loginUser } = require('../services/User/login-service');

exports.create = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const { success, token, err } = await createUser(name, email, password);

    success ? res.send({ token }) : res.status(422).send(err.message);
  } catch (err) {
    res.status(422).send(err.message);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  {
    !email || !password
      ? res.status(422).send({ err: 'Must provide email and password.' })
      : null;
  }

  try {
    const { success, token, err } = await loginUser(email, password);
    success ? res.send({ token }) : res.status(422).send({ err });
  } catch (err) {
    res.status(422).send(err.message);
  }
};
