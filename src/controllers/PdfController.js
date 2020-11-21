const { createPdf } = require('../services/PDF/createPdf-service');
const { getMissions } = require('../services/Mission/getMissions-service');
const { pushPdf } = require('../services/PDF/pushPdf-service');

exports.create = async (req, res) => {
  try {
    const { missions } = await getMissions(req.user._id);
    const { success, err } = await createPdf(req, res, missions);

    if (success) {
      const pdfUrl = await pushPdf(req, res);
      if (pdfUrl !== null) {
        res.status(200);
      }
    } else {
      res.status(422).send(err);
    }
  } catch (err) {
    console.log(err);
    res.status(422).send(err.message);
  }
};

exports.get = async (req, res) => {};
