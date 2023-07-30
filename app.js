const express = require('express');
const cors = require('cors');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const helmet = require('helmet');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());

// Connect to the SQLite database
const db = new sqlite3.Database('baghdad.db', (err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to the database');
  }
});

app.use(cors());

app.use(express.static(path.join(__dirname)));

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  next();
});

// Search endpoint
app.get('/search', (req, res) => {
  const firstName = req.query.firstName || '';
  const fatherName = req.query.fatherName || '';
  const grandfatherName = req.query.grandfatherName || '';
  const birthDate = req.query.birthDate || '';

  console.log('Received search query:');
  console.log('First Name:', firstName);
  console.log('Father Name:', fatherName);
  console.log('Grandfather Name:', grandfatherName);
  console.log('Birth Date:', birthDate);

  // Define the SQL query with placeholders (?) for each column
  const sql = `
    SELECT fam_no, p_first, p_father, p_grand, p_birth, p_job, p_mother, gr_mother, rc_name, f_area, f_street, f_house
    FROM person
    WHERE p_first LIKE ? AND p_father LIKE ? AND p_grand LIKE ? AND p_birth LIKE ?
  `;

  const statement = db.prepare(sql);

  statement.all(
    `%${escapeRegExp(firstName)}%`,
    `%${escapeRegExp(fatherName)}%`,
    `%${escapeRegExp(grandfatherName)}%`,
    `%${escapeRegExp(birthDate)}%`,
    (err, rows) => {
      if (err) {
        console.error('Error executing the query:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        // Log the search results to the server logs
        console.log('Search Results:', rows);

        res.json(rows);
      }
    }
  );
});

// Function to escape regular expression special characters
function escapeRegExp(str) {
  return str.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
