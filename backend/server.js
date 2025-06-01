require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const usersRouter = require('./routes/users');
const projectsRouter = require('./routes/projects');
const applicationsRouter = require('./routes/applications');
const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for localhost
app.use(cors({
    origin: 'http://localhost:5173', // Frontend URL
    methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Allowed HTTP methods
    credentials: true // Allow cookies if needed
}));

connectDB(app, port);
app.use(express.json()); // Middleware to parse JSON -> code that runs when server gets a request, but before it gets passed to routes
app.use('/users', usersRouter);
app.use('/projects', projectsRouter);
app.use('/applications', applicationsRouter);