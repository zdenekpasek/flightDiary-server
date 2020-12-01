const { createPdf } = require('../services/PDF/createPdf-service');
const {
  getAllMissions,
} = require('../services/Mission/getAllMissions-service');
const googleApi = require('../services/PDF/uploadPdf');

exports.create = async (req, res) => {
  try {
    const { missions } = await getAllMissions(req.user._id);
    const { success } = await createPdf(req, res, missions);
    if (success) {
      setTimeout(function () {
        googleApi.uploads(req.user._id).then((result) => {
          res.status(200).send(result);
        });
      }, 500);
    } else {
      res.status(422).send(err);
    }
  } catch (err) {
    console.log(err);
    res.status(422).send(err.message);
  }
};

exports.get = async (req, res) => {};
