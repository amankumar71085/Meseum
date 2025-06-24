const express = require('express');
const nodemailer = require('nodemailer');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const crypto = require('crypto'); // For generating OTP
const moment = require('moment'); // For handling expiration
const chrono = require('chrono-node'); // For parsing natural language dates and times
const PDFDocument = require('pdfkit');
const fs = require('fs');

const app = express();
const port = 3000;

let user = null;

app.use(cors());  // Enable CORS for all requests
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// -----------------------------------------------------------------------------------------------------------
const session = require('express-session');

// Configure session middleware
app.use(session({
    secret: 'your_secret_key', // Replace with a secure key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));
// -----------------------------------------------------------------------------------------------------------



// Create a connection to the MySQL database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'moon1234',
    database: 'museum_bot_v2'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
        return;
    }
    console.log('Connected to MySQL database.');
});

// Function to send OTP email
function sendOtpEmail(email, otp) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: true,
        port: 465,
        auth: {
            user: 'tripathyaniket327@gmail.com',
            pass: 'ufyr fums yahp xgdv'
        }
    });

    const mailOptions = {
        from: 'tripathyaniket327@gmail.com',
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending OTP email:', error);
        } else {
            console.log('OTP email sent:', info.response);
        }
    });
}

// Function to parse natural language time to 24-hour format
function parseTime(timeString) {
    const parsedTime = chrono.parseDate(timeString);
    if (parsedTime) {
        return parsedTime.toTimeString().split(' ')[0]; // Convert to 'HH:mm:ss' format
    }
    return null; // Return null if parsing fails
}

// Function to parse natural language date to 'YYYY-MM-DD' format
function parseDate(dateString) {
    const parsedDate = chrono.parseDate(dateString);
    if (parsedDate) {
        return parsedDate.toISOString().split('T')[0]; // Convert to 'YYYY-MM-DD' format
    }
    return null; // Return null if parsing fails
}

// API endpoint to send OTP
app.post('/send-otp', (req, res) => {
    const { username } = req.body;

    if (!username) {
        return res.status(400).json({ success: false, message: 'Username is required.' });
    }

    // Fetch the user's email from the database
    const sql = 'SELECT email FROM users WHERE username = ?';
    db.query(sql, [username], (err, results) => {
        if (err) {
            console.error('Database error:', err.message);
            return res.status(500).json({ success: false, message: 'Database error: ' + err.message });
        }

        if (results.length === 0) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        const email = results[0].email;

        // Generate OTP
        const otp = crypto.randomInt(100000, 999999); // 6-digit OTP

        // Store OTP in the database
        const expiry = moment().add(10, 'minutes').format('YYYY-MM-DD HH:mm:ss'); // OTP valid for 10 minutes
        const sqlInsertOtp = 'INSERT INTO otp_verification (username, otp, expiry) VALUES (?, ?, ?)';
        db.query(sqlInsertOtp, [username, otp, expiry], (err, result) => {
            if (err) {
                console.error('Database error:', err.message);
                return res.status(500).json({ success: false, message: 'Database error: ' + err.message });
            }

            // Send OTP email
            sendOtpEmail(email, otp);

            res.json({ success: true, message: 'OTP sent successfully to your registered email.' });
        });
    });
});

// API endpoint to handle user registration
app.post('/api/register', (req, res) => {
    const { username, firstName, lastName, email, password } = req.body;

    if (!username || !firstName || !lastName || !email || !password) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    // Hash the password
    const passwordHash = crypto.createHash('sha256').update(password).digest('hex');

    // Insert user into database
    const sql = 'INSERT INTO users (username, first_name, last_name, email, password_hash) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [username, firstName, lastName, email, passwordHash], (err, result) => {
        if (err) {
            console.error('Database error:', err.message);
            return res.status(500).json({ error: 'Database error: ' + err.message });
        }

        // Generate OTP
        const otp = crypto.randomInt(100000, 999999); // 6-digit OTP

        // Store OTP in the database
        const expiry = moment().add(10, 'minutes').format('YYYY-MM-DD HH:mm:ss'); // OTP valid for 10 minutes
        const sqlInsertOtp = 'INSERT INTO otp_verification (username, otp, expiry) VALUES (?, ?, ?)';
        db.query(sqlInsertOtp, [username, otp, expiry], (err, result) => {
            if (err) {
                console.error('Database error:', err.message);
                return res.status(500).json({ error: 'Database error: ' + err.message });
            }

            // Send OTP email
            sendOtpEmail(email, otp);

            res.json({ message: 'Registration successful! Please check your email for the OTP.' });
        });
    });
});

app.post('/api/login', (req, res) => {
    const { username, otp } = req.body;

    if (!username || !otp) {
        return res.status(400).json({ error: 'Username and OTP are required.' });
    }

    // Verify OTP
    const sql = 'SELECT otp, expiry, verified FROM otp_verification WHERE username = ? AND otp = ? ORDER BY otp_id DESC LIMIT 1';
    db.query(sql, [username, otp], (err, results) => {
        if (err) {
            console.error('Database error:', err.message);
            return res.status(500).json({ error: 'Database error: ' + err.message });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Invalid OTP.' });
        }

        const otpRecord = results[0];

        if (otpRecord.verified) {
            return res.status(400).json({ error: 'OTP already used.' });
        }

        if (moment().isAfter(otpRecord.expiry)) {
            return res.status(400).json({ error: 'OTP has expired.' });
        }

        // Mark OTP as verified
        const sqlVerifyOtp = 'UPDATE otp_verification SET verified = TRUE WHERE username = ? AND otp = ?';
        db.query(sqlVerifyOtp, [username, otp], (err, result) => {
            if (err) {
                console.error('Database error:', err.message);
                return res.status(500).json({ error: 'Database error: ' + err.message });
            }

            // Store the username in the session
            req.session.username = username;
            user = username;

            res.json({ success: true, message: 'Login successful!', username: req.session.username });
        });
    });
});

// API endpoint to retrieve the logged-in user
app.get('/api/user', (req, res) => {
    if (req.session.username) {
        res.json({ username: req.session.username });
    } else {
        res.status(401).json({ error: 'Not logged in.' });
    }
});

// API endpoint to handle logout
app.post('/api/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Logout error:', err.message);
            return res.status(500).json({ error: 'Logout error: ' + err.message });
        }
        res.json({ message: 'Logout successful.' });
    });
});


// API endpoint to handle booking requests
app.post('/api/book', (req, res) => {
    const { tickets, date, time } = req.body;

    if (!tickets || !date || !time) {
        console.error("Missing fields in booking request", req.body);
        res.status(400).json({ error: "All fields (tickets, date, time) are required." });
        return;
    }

    const parsedDate = parseDate(date);
    const parsedTime = parseTime(time);
    const username = user;

    if (!parsedDate || !parsedTime) {
        console.error("Unable to parse date or time", { date, time });
        res.status(400).json({ error: "Invalid date or time format." });
        return;
    }

    const sql = "INSERT INTO bookings (username,tickets, date, time) VALUES (?, ?, ?, ?)";
    db.query(sql, [username,tickets, parsedDate, parsedTime], (err, result) => {
        if (err) {
            console.error('Database error:', err.message);
            res.status(500).json({ error: "Database error: " + err.message });
            return;
        }
        res.json({ message: "Booking successful!", bookingId: result.insertId });
    });


});

// API endpoint to retrieve all bookings
app.get('/api/bookings', (req, res) => {
    const sql = "SELECT * FROM bookings";
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Database error:', err.message);
            res.status(500).json({ error: "Database error: " + err.message });
            return;
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
