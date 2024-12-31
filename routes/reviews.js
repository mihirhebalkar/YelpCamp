const express = require('express');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');

const Campground = require('../models/campground');
const Review = require('../models/review');
const {isLoggedIn, isAuthor, validateReview, isReviewAuthor} = require('../middleware')
const router = express.Router({ mergeParams : true });

//Reviews routes


router.post('/', isLoggedIn, validateReview,catchAsync(async(req,res)=>{
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'Created new review');
    res.redirect(`/campgrounds/${campground._id}`);
}))


router.delete('/:reviewId',isLoggedIn, isReviewAuthor, catchAsync(async(req,res)=>{
    const {reviewId, id} = req.params;
    await Campground.findByIdAndUpdate(id, {$pull: { reviews: reviewId }});
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review');
    res.redirect(`/campgrounds/${id}`);
}))


module.exports = router;