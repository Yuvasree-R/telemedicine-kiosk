const express = require('express');
const router = express.Router();
const axios = require('axios');

// Aadhaar Authentication
router.post('/', async (req, res) => {
    const { aadhaarNumber } = req.body;

    // Simulating Aadhaar authentication
    try {
        const response = await axios.post('https://aadhaarapi.gov.in/verify', { aadhaarNumber });
        if (response.data.isValid) {
            res.status(200).json({ message: 'Authentication Successful' });
        } else {
            res.status(401).json({ message: 'Authentication Failed' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Aadhaar API Error', error: error.message });
    }
});

module.exports = router;
