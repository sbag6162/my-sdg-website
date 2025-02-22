// server.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import csvParser from 'csv-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Load FAQ data from CSV into faqList
let faqList = [];
fs.createReadStream(path.join(__dirname, 'faq.csv'))
  .pipe(csvParser())
  .on('data', (row) => {
    faqList.push({
      question: row.question.toLowerCase().trim(),
      answer: row.answer.trim(),
    });
  })
  .on('end', () => {
    console.log('FAQ CSV loaded successfully:', faqList.length, 'entries');
  })
  .on('error', (err) => {
    console.error('Error reading CSV:', err);
  });

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Chat endpoint: match user input exactly to CSV entries
app.post('/chat', (req, res) => {
  const userMessage = (req.body.message || '').toLowerCase().trim();
  const match = faqList.find((item) => item.question === userMessage);
  if (match) {
    res.json({ reply: match.answer });
  } else {
    res.json({ reply: "Sorry, I don't have info on that. Try asking something else!" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
