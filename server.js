const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// Configure middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Define the database connection
const db = new sqlite3.Database('mod.sqlite', sqlite3.OPEN_READONLY, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the mod.sqlite database.');
    }
});

// Define the search endpoint
app.post('/search', (req, res) => {
    const fullName = req.body.full_name;
    
    const query = "SELECT * FROM mod WHERE " +
        "ت LIKE '%' || ? || '%' OR " +
        "PERSON_ID LIKE '%' || ? || '%' OR " +
        "P_NO LIKE '%' || ? || '%' OR " +
        "P_RANK LIKE '%' || ? || '%' OR " +
        "P_ALAWA LIKE '%' || ? || '%' OR " +
        "P_NAME LIKE '%' || ? || '%' OR " +
        "P_CLASS LIKE '%' || ? || '%' OR " +
        "P_UNIT LIKE '%' || ? || '%' OR " +
        "M_UNIT LIKE '%' || ? || '%' OR " +
        "P_STATUS LIKE '%' || ? || '%' OR " +
        "P_QUALIFICATION LIKE '%' || ? || '%' OR " +
        "P_RANK_DATE LIKE '%' || ? || '%'";
    
    const params = Array(12).fill(fullName); // Duplicate the input for each parameter
    
    db.all(query, params, (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'An error occurred while fetching data.' });
        } else {
            res.json(rows);
        }
    });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
