const moment = require('moment');
let tableStartPos = 130;

function generateHeader(doc, missions) {
  doc
    .fillColor('#444444')
    .fontSize(20)
    .text('Letecký deník', 50, 57)
    .fontSize(17)
    .text('Export misí', 50, 80)
    .fontSize(12)
    .text(`Pilot: ${missions[0].pilot}`, 200, 65, { align: 'right' })
    .fontSize(17)
    .moveDown();
}

function generateFooter(doc) {
  doc
    .fontSize(10)
    .text('Flight Diary 2020', 50, 730, { align: 'center', width: 500 });
}

function generateBody(doc, missions) {
  let index = 1;
  for (i = 0; i < missions.length; i++) {
    const item = missions[i];
    let position = tableStartPos + index * 60;
    index++;
    if (position > 650) {
      index = 0;
      tableStartPos = 20;
      doc.addPage();
    }
    generateTableBody(
      doc,
      position,
      item.missionName,
      item.uav,
      item.gps,
      item.flightTime,
      item.tmp,
      item.wind,
      moment(item.missionStart).format('lll'),
      moment(item.missionEnd).format('lll'),
      item.usedBatteries,
      item.desc
    );
  }
}

function generateTableRow(doc, y, c1, c2, c3, c4, c5, c6, c7, c8, c9, c10) {
  doc
    .font('Helvetica-Bold')
    .fontSize(10)
    .text(c1, 50, y)
    .text(c2, 150, y)
    .text(c3, 320, y)
    .text(c4, 480, y)
    .moveDown()
    .text(c5, 50, y + 15)
    .text(c6, 150, y + 15)
    .text(c7, 320, y + 15)
    .text(c8, 480, y + 15)
    .text(c9, 50, y + 30)
    .text(c10, 150, y + 30);
}

function generateTableBody(doc, y, c1, c2, c3, c4, c5, c6, c7, c8, c9, c10) {
  doc
    .fontSize(10)
    .text(c1, 50, y)
    .text(c2, 150, y)
    .text(c3, 250, y)
    .text(`${c4} min`, 480, y)
    .moveDown()
    .text(`${c5} °C`, 50, y + 15)
    .text(`${c6} m/s`, 150, y + 15)
    .text(c7, 250, y + 15)
    .text(c8, 450, y + 15)
    .text(c9, 50, y + 30)
    .text(c10, 150, y + 30);
}

function generateHr(doc, y) {
  doc.strokeColor('#aaaaaa').lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
}

function generateInnerPdf(doc, missions) {
  generateHeader(doc, missions);
  generateTableRow(
    doc,
    tableStartPos,
    'Název mise',
    'Uav',
    'GPS',
    'Doba letu',
    'Teplota',
    'Vítr',
    'Start mise',
    'Konec mise',
    'Použité baterie',
    'Popis'
  );
  generateHr(doc, tableStartPos + 45);
  generateBody(doc, missions);
  generateFooter(doc);
}

module.exports = {
  generateHeader,
  generateFooter,
  generateBody,
  generateInnerPdf,
};
