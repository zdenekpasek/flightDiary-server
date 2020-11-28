const { google } = require('googleapis');
const fs = require('fs');
const credentials = require('../../../credentials.json');
const scopes = ['https://www.googleapis.com/auth/drive'];

exports.uploads = (_id) => {
  return new Promise((resolve) => {
    const auth = new google.auth.JWT(
      credentials.client_email,
      null,
      credentials.private_key,
      scopes
    );
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

      (error, result) => {
        resolve({
          fileUrl: `https://drive.google.com/file/d/${result.data.id}/view?usp=sharing`,
        });
      }
    );
  });
};
