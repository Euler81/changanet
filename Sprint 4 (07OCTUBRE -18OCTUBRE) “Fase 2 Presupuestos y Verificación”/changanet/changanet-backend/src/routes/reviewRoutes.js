// src/routes/reviewRoutes.js
const express = require('express');
const { createReview, getReviewsByProfessional } = require('../controllers/reviewController');

const router = express.Router();

router.post('/', createReview);
router.get('/professional/:professionalId', getReviewsByProfessional);

module.exports = router;