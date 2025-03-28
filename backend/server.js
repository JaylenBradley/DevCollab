require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose")
const admin = require("firebase-admin");

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Connected to the database")
      app.listen(port, () => {
          console.log(`Server is running on http://localhost:${port}`);
      });
    })
    .catch(() =>{
      console.log("Connection failed")
    })

app.get('/', (req, res) => {
  res.send('Hello World!');
});