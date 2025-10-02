// src/routes/quoteRoutes.js
const express = require('express');
const { createQuoteRequest, respondToQuote, getClientQuotes, getProfessionalQuotes } = require('../controllers/quoteController');

const router = express.Router();

router.post('/request', createQuoteRequest);
router.post('/respond', respondToQuote);
router.get('/client', getClientQuotes);
router.get('/professional', getProfessionalQuotes);

module.exports = router;