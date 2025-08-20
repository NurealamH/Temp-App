const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());

const books = [
  { id: 1, title: 'Fatawa-e-Razviyya', topic: 'Fiqh', language: 'Urdu', year: 1904 },
  { id: 2, title: 'Kanzul Iman', topic: 'Tafsir', language: 'Urdu', year: 1911 },
  { id: 3, title: 'Husamul Haramain', topic: 'Aqidah', language: 'Arabic', year: 1906 },
  { id: 4, title: 'Al-Attaya Al-Nabawiyyah fi Al-Fatawa Al-Ridawiyyah', topic: 'Fiqh', language: 'Arabic', year: 1904 },
];

app.get('/api/books', (req, res) => {
  res.json(books);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
