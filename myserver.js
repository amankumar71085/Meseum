const express = require('express');
const nodemailer = require('nodemailer');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const moment = require('moment');
const chrono = require('chrono-node');

const app = express();
const port = 3000;

let user = null;
let mail = null;
let num = null;
let d = null;
let t = null;
let tid = null;

app.use(cors()); // Enable CORS for all requests
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ---------------------------------------------------------










// Creating a connection to the MySQL database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'moon1234',
    database: 'museum_bot_v2'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:',err.message);
        return;
    }
    console.log('Connected to MySQL database.');
});

// ---------------------------------------------------------










// Function to send OTP email
function sendOtpEmail(email,otp) {
    mail = email;
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
        from: 'Ticket Chatbot',
        to: email,
        subject: 'OTP for Ticket Chatbot',
        html: `Thank you for using our platform. <br><br>Your OTP code is <b>${otp}</b>.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending OTP email:', error);
        } else {
            console.log('OTP email sent:', info.response);
        }
    });
}

// ---------------------------------------------------------










// Function to send Ticket via email
function sendTicketMail(recipientEmail, tickets, date, time) {
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
        from: 'Ticket Chatbot',
        to: recipientEmail,
        subject: 'Your E-Ticket Details',
        html: `Thank you <b>${user}</b> for using our platform.<br><br>
                <h3>Your Booking Details</h3>
                <table style="width: 50%; border-collapse: collapse; margin-top: 10px;">
                    <tr style="background-color: #f2f2f2;">
                        <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Detail</th>
                        <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Value</th>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #ddd; padding: 8px;"><strong>Ticket ID</strong></td>
                        <td style="border: 1px solid #ddd; padding: 8px;">MUSTIK-${tid}</td>
                    </tr>
                    <tr style="background-color: #f9f9f9;">
                        <td style="border: 1px solid #ddd; padding: 8px;"><strong>Number of People</strong></td>
                        <td style="border: 1px solid #ddd; padding: 8px;">${tickets}</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #ddd; padding: 8px;"><strong>Date</strong></td>
                        <td style="border: 1px solid #ddd; padding: 8px;">${date}</td>
                    </tr>
                    <tr style="background-color: #f9f9f9;">
                        <td style="border: 1px solid #ddd; padding: 8px;"><strong>Time</strong></td>
                        <td style="border: 1px solid #ddd; padding: 8px;">${time}</td>
                    </tr>
                </table>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending ticket email:', error);
        } else {
            console.log('Ticket email sent:', info.response);
        }
    });
}

// ----------------------------------------------------------










// Function to parse natural language time to 24-hour format
function parseTime(timeString) {
    const parsedTime = chrono.parseDate(timeString);
    if (parsedTime) {
        return parsedTime.toTimeString().split(' ')[0]; // Convert to 'HH:mm:ss' format
    }
    return null; // Return null if parsing fails
}

//Function to parse natural laguage date to 'YYYY-MM-DD' format
function parseDate(dateString) {
    const parsedDate = chrono.parseDate(dateString);
    if (parsedDate) {
        return parsedDate.toISOString().split('T')[0]; //Convert to 'YYYY-MM-DD' format
    }
    return null; //Return null if parsing fails
}

// ----------------------------------------------------------