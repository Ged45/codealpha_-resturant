// import express from "express";
// import bodyParser from "body-parser";
// import mongoose from "mongoose";
// import cors from "cors";
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require("path");
const { brotliDecompress } = require("zlib");
const __file = require('url'); // This will hold the current file's name
const __diname = path.dirname(__filename); // Get the directory name from the filename

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/restaurant');
 
// Routes
app.use(express.json());
app.use('/api/orders', require(__diname + '/routes/order'));
app.use('/api/inventory', require(__diname + '/routes/inventory'));
app.use('/api/reservations', require(__diname +'/routes/reservation'));
app.use('/api/menu-items', require(__diname + '/routes/menuitems'));
app.use('api/reports', require(__diname + '/routes/report'));



// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



