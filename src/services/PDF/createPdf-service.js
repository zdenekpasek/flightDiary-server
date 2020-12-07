const mongoose = require('mongoose');
const { google } = require('googleapis');
const User = mongoose.model('User');
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const { generateInnerPdf } = require('../../utils/pdfFunc');
const credentials = require('../../../credentials.json');
const scopes = ['https://www.googleapis.com/auth/drive'];
const googleApi = require('../../services/PDF/uploadPdf');

const createPdf = async (req, res, missions) => {
  try {
    const { _id } = req.user;
    const pdfPath = path.join('data', 'pdf', _id + '.pdf');
    let doc = new PDFDocument({ bufferPages: true, margin: 50 });

    doc.pipe(fs.createWriteStream(pdfPath));

    generateInnerPdf(doc, missions);

    doc.end();

    return { success: true };
  } catch (err) {
    return { success: false };
  }
};

module.exports = {
  createPdf,
};
