const { createUav } = require('../services/Uav/createUav-service');
const { getUavs } = require('../services/Uav/getUavs-service');

exports.create = async (req, res) => {
  const { uavName, weight, category, uav, okNumber } = req.body;
  const { _id } = req.user;

  if (!uavName || !weight || !category || !uav || !okNumber) {
    return res.status(422).send({ error: 'You must provide all needed data.' });
  }

  try {
    const { success, uavs, err } = await createUav(
      _id,
      uavName,
      weight,
      category,
      uav,
      okNumber
    );

    success ? res.send({ uavs }) : res.status(422).send(err.message);
  } catch (err) {
    res.status(422).send(err.message);
  }
};

exports.getUavs = async (req, res) => {
  const { _id } = req.user;

  try {
    const { success, uavs, err } = await getUavs(_id);
    success ? res.send({ uavs }) : res.status(422).send(err.message);
  } catch (err) {
    res.status(422).send(err.message);
  }
};
