const express = require('express');
const router = express.Router();
const { Document, Packer, Paragraph, TextRun, HeadingLevel } = require('docx');

router.post('/prd', async (req, res) => {
  try {
    const { projectName, targetAudience, coreFeatures } = req.body;

    // 1. Define the structural elements of the Word Document
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            text: `Product Requirements Document: ${projectName || 'Untitled Project'}`,
            heading: HeadingLevel.HEADING_1,
            spacing: { after: 300 },
          }),
          new Paragraph({
            children: [new TextRun({ text: "Target Audience", bold: true, size: 28 })],
            spacing: { before: 200, after: 100 },
          }),
          new Paragraph({
            text: targetAudience || 'Not specified.',
          }),
          new Paragraph({
            children: [new TextRun({ text: "Core Architecture & Features", bold: true, size: 28 })],
            spacing: { before: 200, after: 100 },
          }),
          new Paragraph({
            text: coreFeatures || 'No features listed.',
          }),
        ],
      }],
    });

    // 2. Compile the document into a memory buffer
    const buffer = await Packer.toBuffer(doc);

    // 3. Set the headers to force the browser/app to download it as a .docx file
    res.setHeader('Content-Disposition', `attachment; filename=${projectName ? projectName.replace(/\s+/g, '_') : 'PRD'}.docx`);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');

    // 4. Fire the file back to the client
    res.send(buffer);

  } catch (error) {
    console.error('Error generating DOCX:', error);
    res.status(500).json({ error: 'Failed to generate PRD document' });
  }
});

module.exports = router;