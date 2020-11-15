const { createMission } = require('../services/Mission/createMission-service');
const { getMissions } = require('../services/Mission/getMissions-service');

exports.create = async (req, res) => {
  const {
    missionName,
    uav,
    gps,
    missionStart,
    missionEnd,
    usedBatteries,
    tmp,
    wind,
    desc,
  } = req.body;
  console.log(req.body);
  const { _id, name } = req.user;
  if (
    !missionName ||
    !uav ||
    !gps ||
    !missionStart ||
    !missionEnd ||
    !tmp ||
    !wind
  ) {
    return res.status(422).send({ error: 'You must provide all needed data.' });
  }

  try {
    const { success, mission, err } = await createMission(
      _id,
      missionName,
      name,
      uav,
      gps,
      missionStart,
      missionEnd,
      usedBatteries,
      tmp,
      wind,
      desc
    );

    success ? res.send({ mission }) : res.status(422).send(err.message);
  } catch (err) {
    res.status(422).send(err.message);
  }
};

exports.update = async (req, res) => {};

exports.getMissions = async (req, res) => {
  const { _id } = req.user;

  try {
    const { success, missions, err } = await getMissions(_id);
    success ? res.send({ missions }) : res.status(422).send(err.message);
  } catch (err) {
    res.status(422).send(err.message);
  }
};
