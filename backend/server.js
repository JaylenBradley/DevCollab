require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const usersRouter = require('./routes/users');
const projectsRouter = require('./routes/projects');
const applicationsRouter = require('./router/applications');

const app = express();
const port = process.env.PORT || 3000;

connectDB(app, port);
app.use(express.json()); // Middleware to parse JSON -> code that runs when server gets a request, but before it gets passed to routes
app.use('/users', usersRouter);
app.use('/projects', projectsRouter);
app.use('/applications', applicationsRouter);