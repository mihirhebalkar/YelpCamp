const express = require('express');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');

const reviews = require('../controllers/reviews');

const Campground = require('../models/campground');
const Review = require('../models/review');
const {isLoggedIn, isAuthor, validateReview, isReviewAuthor} = require('../middleware')
const router = express.Router({ mergeParams : true });

//Reviews routes


router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));


router.delete('/:reviewId',isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));


module.exports = router;