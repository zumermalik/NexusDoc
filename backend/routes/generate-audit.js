// backend/routes/generate-audit.js
const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');

router.post('/audit', (req, res) => {
  try {
    const { projectName, auditScope, codeSnippet } = req.body;

    const doc = new PDFDocument({ margin: 50 });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${projectName ? projectName.replace(/\s+/g, '_') : 'Security_Audit'}.pdf`);

    doc.pipe(res);

    // Header: Red/Dark theme for "Security Alert" vibe
    doc.rect(0, 0, 612, 120).fill('#111827'); 
    doc.fontSize(32).font('Helvetica-Bold').fillColor('#EF4444').text('SECURITY AUDIT', 50, 40);
    doc.fontSize(14).fillColor('#F9FAFB').text(`Target: ${projectName || 'Unknown System'}`, 50, 80);

    // Body
    doc.moveDown(4);
    doc.fontSize(18).font('Helvetica-Bold').fillColor('#111827').text('1. Audit Scope');
    doc.fontSize(12).font('Helvetica').fillColor('#4B5563').text(auditScope || 'General Codebase Review', { align: 'justify' });
    doc.moveDown(2);

    doc.fontSize(18).font('Helvetica-Bold').fillColor('#111827').text('2. Target Code / Architecture');
    doc.moveDown(0.5);
    
    // Code block background
    doc.rect(50, doc.y, 500, Math.max(100, doc.heightOfString(codeSnippet || 'No code provided.')) + 20).fill('#F3F4F6');
    doc.fillColor('#EF4444').fontSize(10).font('Courier').text(codeSnippet || 'No code provided.', 60, doc.y + 10);

    doc.moveDown(2);
    doc.fontSize(18).font('Helvetica-Bold').fillColor('#111827').text('3. Automated Findings');
    doc.fontSize(12).font('Helvetica').fillColor('#4B5563').text('Status: Awaiting Deep Static Analysis Engine. Current input has been logged for manual review.');

    doc.end();

  } catch (error) {
    console.error('Error generating Audit:', error);
    res.status(500).json({ error: 'Failed to generate Audit document' });
  }
});

module.exports = router;