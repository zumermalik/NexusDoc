const express = require('express');
const cors = require('cors');
const docxRoute = require('./routes/generate-docx');
const apiRoute = require('./routes/generate-api'); 
const auditRoute = require('./routes/generate-audit');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.get('/api/status', (req, res) => {
  res.json({ status: 'NexusDoc Backend is running locally 🚀' });
});

app.use('/api/generate', docxRoute);
app.use('/api/generate', apiRoute);
app.use('/api/generate', auditRoute);

app.listen(PORT, () => {
  console.log(`Backend server listening on http://localhost:${PORT}`);
});