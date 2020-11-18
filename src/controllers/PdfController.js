const { createPdf } = require('../services/PDF/createPdf-service');
const { getMissions } = require('../services/Mission/getMissions-service');

exports.create = async (req, res) => {
  try {
    const { missions } = await getMissions(req.user._id);
    const { success, err } = await createPdf(req, res, missions);

    success ? res.status(200) : res.status(422).send(err);
  } catch (err) {
    console.log(err);
    res.status(422).send(err.message);
  }
};

exports.get = async (req, res) => {};
