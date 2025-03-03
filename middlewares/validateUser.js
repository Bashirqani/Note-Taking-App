const mongoose = require('mongoose');

// Middleware to validate MongoDB ObjectId
const validateUserId = (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid User ID' });
    }

    next();
};

// Middleware to log requests
const logRequests = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
};

// Error-handling middleware
const errorHandler = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    console.error(`[Error] ${status} - ${message}`);

    res.status(status).json({ status, message });
};

module.exports = { validateUserId, logRequests, errorHandler };
