const express = require('express');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const router = express.Router();

router.post('/', (req, res) => {
    const { patientName, doctorName, medicines } = req.body;

    const doc = new PDFDocument();
    const fileName = `${patientName}_Prescription.pdf`;
    doc.pipe(fs.createWriteStream(fileName));

    doc.fontSize(20).text('Prescription', { align: 'center' });
    doc.moveDown();
    doc.fontSize(16).text(`Patient: ${patientName}`);
    doc.text(`Doctor: ${doctorName}`);
    doc.moveDown();
    doc.fontSize(14).text('Medicines:');
    medicines.forEach((medicine, index) => {
        doc.text(`${index + 1}. ${medicine}`);
    });

    doc.end();
    
    res.status(200).json({ message: 'Prescription Generated', file: fileName });
});

module.exports = router;
