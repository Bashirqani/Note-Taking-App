require("dotenv").config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');  
const noteRoutes = require('./routes/noteRoutes'); 
const authRoutes = require('./routes/authRoutes'); 


const app = express();

// Middleware
app.use(express.json()); 
app.use(cors()); 

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/notes', noteRoutes); 
app.use('/api/auth', authRoutes);  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
