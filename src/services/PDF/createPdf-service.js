const mongoose = require('mongoose');
const { google } = require('googleapis');
const User = mongoose.model('User');
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const { generateInnerPdf } = require('../../utils/pdfFunc');
const credentials = require('../../../credentials.json');
const scopes = ['https://www.googleapis.com/auth/drive'];

const createPdf = async (req, res, missions) => {
  try {
    const { _id } = req.user;
    const pdfPath = path.join('data', 'pdf', _id + '.pdf');
    let doc = new PDFDocument({ margin: 50 });

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/pdf');

    doc.pipe(fs.createWriteStream(pdfPath));
    await doc.pipe(res);

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
