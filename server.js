const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const port = 5000;

// MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'ch@nge2new',
  database: 'mydairy'
});

// Establish connection to the database
db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
    return;
  }
  console.log('Connected to the database');
});

// Middleware to parse JSON
app.use(express.json());

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000',  // Allow frontend from localhost:3000 (if React or any other local app)
  methods: ['GET', 'POST'], // allowed methods
  allowedHeaders: ['Content-Type'] // allowed headers
};

app.use(cors(corsOptions));
//// API endpoint to count no of pages 
app.get('/api/count', (req, res) => {
  console.log('API triggered');
  const query = 'SELECT COUNT(pageno) from mydairyTable';  // Replace with your SQL query

  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send('Database query error');
      return;
    }

    // Log the results to verify the correct data is returned
    console.log('Query results:', results);

    // Send the results as JSON response
    res.json(results);
  });
});

//  API endpoint search by date
app.get('/api/searchbydate', (req, res) => {
  
  
  
  console.log('API triggered')
  const dateatserver = req.query.searchDate;
  
  console.log(`Page received: ${dateatserver}`);

  

  const query = 'SELECT content from mydairyTable WHERE date=?';

  db.query(query, [dateatserver], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).send('Database query error');
    }

    if (results.length === 0) {
      return res.status(404).send('No data found for the given date');
    }

    console.log('Query results:', results);

    res.json({ data: results });
  });
});

//  API endpoint search by pageNO
app.get('/api/data', (req, res) => {
  
  
  
  
  const pageatserver = req.query.searchPage;
  
  console.log(`Page number received: ${pageatserver}`);

  if (!pageatserver || isNaN(pageatserver)) {
    return res.status(400).send('Invalid or missing pageno parameter');
  }

  const query = 'SELECT content from mydairyTable WHERE pageno=?';

  db.query(query, [pageatserver], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).send('Database query error');
    }

    if (results.length === 0) {
      return res.status(404).send('No data found for the given pageno');
    }

    console.log('Query results:', results);

    res.json({ data: results });
  });
});

//////////////////////////////////////
////API to insert into DB/////////////s

app.post('/api/write', (req, res) => {
  const { pageAtServer, contentAtServer, dateAtServer } = req.body;

  const query = 'INSERT INTO mydairyTable (pageno, content, date) VALUES (?,?,?)';

  db.query(query, [pageAtServer, contentAtServer, dateAtServer], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).send('Database query error');
    }

    console.log('Inserted data:', results);
    res.json({ data: results }); // Send results in response
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
