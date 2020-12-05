const { createMission } = require('../services/Mission/createMission-service');
const { getMissions } = require('../services/Mission/getMissions-service');
const { getMission } = require('../services/Mission/getMissionById-service');
const { updateMission } = require('../services/Mission/updateMission-service');
const { deleteMission } = require('../services/Mission/deleteMission-service');

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

exports.update = async (req, res) => {
  const {
    missionName,
    uav,
    missionStart,
    missionEnd,
    usedBatteries,
    desc,
  } = req.body;

  const { _id } = req.user;
  const missionId = req.params.id;

  if (!missionId || !missionName || !uav || !missionStart || !missionEnd) {
    return res.status(422).send({ error: 'You must provide all needed data.' });
  }

  try {
    const { success, mission, err } = await updateMission(
      _id,
      missionId,
      missionName,
      uav,
      missionStart,
      missionEnd,
      usedBatteries,
      desc
    );

    success
      ? res.send({ success, mission })
      : res.status(422).send(err.message);
  } catch (err) {
    res.status(422).send(err.message);
  }
};

exports.getMissions = async (req, res) => {
  const { _id } = req.user;
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  console.log(page, limit);

  try {
    const { success, missions, err } = await getMissions(_id, page, limit);
    success ? res.send({ missions }) : res.status(422).send(err.message);
  } catch (err) {
    res.status(422).send(err.message);
  }
};

exports.getMissionById = async (req, res) => {
  const { _id } = req.user;
  const missionId = req.params.id;
  console.log(missionId);
  try {
    const { success, mission, err } = await getMission(missionId);
    success ? res.send({ mission }) : res.status(422).send(err.message);
  } catch (err) {
    res.status(422).send(err.message);
  }
};

exports.delete = async (req, res) => {
  const { _id } = req.user;
  const missionId = req.params.id;

  try {
    const { success, err } = await deleteMission(_id, missionId);
    success
      ? res.status(200).send({ success })
      : res.status(422).send(err.message);
  } catch (err) {
    res.status(422).send(err.message);
  }
};
