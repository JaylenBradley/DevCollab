require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db')
const subscribersRouter = require('./routes/subscribers');
const usersRouter = require('./routes/users')

const app = express();
const port = process.env.PORT || 3000;

connectDB(app, port);
app.use(express.json()); // Middleware to parse JSON -> code that runs when server gets a request, but before it gets passed to routes
app.use('/users', usersRouter);

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });