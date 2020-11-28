const { google } = require('googleapis');
const fs = require('fs');
const credentials = require('../../../credentials.json');
const scopes = ['https://www.googleapis.com/auth/drive'];

const auth = new google.auth.JWT(
  credentials.client_email,
  null,
  credentials.private_key,
  scopes
);

// TODO: retrieve ID from this to controller and to user
function uploadFile(auth, _id) {
  let fileUrl = null;
  const drive = google.drive({ version: 'v3', auth });
  var folderId = '1UOHGugDc6r7nbUWROtR71Ql12XMaE3xg';

  var fileMetadata = {
    name: `${_id}.pdf`,
    parents: [folderId],
  };
  var media = {
    mimeType: 'application/pdf',
    body: fs.createReadStream(`${_id}.pdf`),
  };
  drive.files.create(
    {
      resource: fileMetadata,
      media: media,
      fields: 'id',
    },
    function (err, file) {
      if (err) {
        console.log(err);
      } else {
        console.log('File: ', file.data);

        fileUrl = `https://drive.google.com/file/d/${file.data.id}/view?usp=sharing`;
      }
    }
  );
  console.log(fileUrl);
  return fileUrl;
}

const pushPdf = async (req, res) => {
  const { _id } = req.user;

  try {
    const pdfUrl = uploadFile(auth, _id);
    // return { pdfUrl };
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  pushPdf,
};
