Object.keys(require.cache).forEach(function(key) { delete require.cache[key] });
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const path = require('path');
const internRoutes = require('./routes/internRoutes');
const employerRoutes = require('./routes/employersRoutes');


const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/interns', internRoutes);  // Add this line for interns route
app.use('/api/employers', employerRoutes);

// Set up the public directory to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Set up a route for the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'landingpage.html'));
    });

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'loginpage.html'));
    });

app.get('/internprofile', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'internprofile.html'));
    });
    
app.get('/internshiplists', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'internshiplists.html'));
    });



    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
        });