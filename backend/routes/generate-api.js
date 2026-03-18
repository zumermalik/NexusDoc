// backend/routes/generate-api.js
const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');

router.post('/api', (req, res) => {
  try {
    const { apiName, baseUrl, endpoints } = req.body;

    // 1. Initialize the pure-JS PDF generator
    const doc = new PDFDocument({ margin: 50 });

    // 2. Set headers to force the browser to download it
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${apiName ? apiName.replace(/\s+/g, '_') : 'API_Docs'}.pdf`);

    // 3. Pipe the PDF directly back to the client as it generates
    doc.pipe(res);

    // 4. Draw the text onto the document
    doc.fontSize(28).font('Helvetica-Bold').fillColor('#111827').text(apiName || 'API Documentation');
    doc.moveDown(0.5);
    
    doc.fontSize(14).font('Helvetica').fillColor('#6B7280').text(`Base URL: ${baseUrl || 'Not specified'}`);
    doc.moveDown(2);
    
    doc.fontSize(18).font('Helvetica-Bold').fillColor('#111827').text('Available Endpoints');
    doc.moveDown(0.5);
    
    // Add a light gray background box effect for the endpoints
    doc.rect(50, doc.y, 500, doc.heightOfString(endpoints || 'No endpoints defined.') + 20).fill('#F3F4F6');
    doc.fillColor('#111827').fontSize(12).font('Courier').text(endpoints || 'No endpoints defined.', 60, doc.y + 10);

    // 5. Finalize the PDF
    doc.end();

  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ error: 'Failed to generate API document' });
  }
});

module.exports = router;