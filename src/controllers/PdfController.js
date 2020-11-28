const { createPdf } = require('../services/PDF/createPdf-service');
const { getMissions } = require('../services/Mission/getMissions-service');
const { pushPdf } = require('../services/PDF/pushPdf-service');
const googleApi = require('../services/PDF/uploadPdf');

exports.create = async (req, res) => {
  try {
    const { missions } = await getMissions(req.user._id);
    const { success } = await createPdf(req, res, missions);

    if (success) {
      googleApi.uploads(req.user._id).then((result) => {
        res.status(200).send(result);
      });
    } else {
      res.status(422).send(err);
    }
  } catch (err) {
    console.log(err);
    res.status(422).send(err.message);
  }
};

exports.get = async (req, res) => {};
