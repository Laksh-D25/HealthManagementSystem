const express = require('express');
const mysql = require('mysql2');
const crypto = require('crypto');
const cors = require('cors');

const db = mysql.createConnection({
    host: 'localhost',       // Change if your MySQL server is not on localhost
    user: 'root',            // MySQL username
    password: '12345678',            // MySQL password
    database: 'HospitalDB', // Database you created
    port: 7768 
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
        return;
    }
    console.log('Connected to the MySQL database.');
});

const app = express();

app.use(express.json());
app.use(cors());

const port = 3000;

const generateSessionID = () => {
    return crypto.randomBytes(16).toString('hex');  // Simple random session ID
};

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    // Search in admins table first
    const queryAdmin = 'SELECT * FROM Admin WHERE email = ? AND password = ?';
    db.query(queryAdmin, [username, password], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err.message });
        }

        if (results.length > 0) {
            // Found in admin
            const sessionID = generateSessionID();
            return res.json({ message: 'Login successful', authLevel: 1, sessionID });
        }

        // Search in doctors table if not found in admin
        const queryDoctor = 'SELECT * FROM Doctor WHERE email = ? AND password = ?'; // Assuming a password field exists for doctors
        db.query(queryDoctor, [username, password], (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Database error', error: err.message });
            }

            if (results.length > 0) {
                // Found in doctor
                const sessionID = generateSessionID();
                return res.json({ message: 'Login successful', authLevel: 2, sessionID });
            }

            // Search in patients table if not found in doctor
            const queryPatient = 'SELECT * FROM Patient WHERE email = ? AND password = ?'; // Assuming a password field exists for patients
            db.query(queryPatient, [username, password], (err, results) => {
                if (err) {
                    return res.status(500).json({ message: 'Database error', error: err.message });
                }

                if (results.length > 0) {
                    // Found in patient
                    const sessionID = generateSessionID();
                    return res.json({ message: 'Login successful', authLevel: 3, sessionID });
                }

                // If not found in any table
                return res.status(401).json({ message: 'Invalid username or password' });
            });
        });
    });
});




app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
