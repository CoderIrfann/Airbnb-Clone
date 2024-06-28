const express = require('express');
const router = express.Router({mergeParams:true});

const wrapAsync = require("../utils/wrapAsyc.js");
const ExpressStatus = require("../utils/ExpressError.js");
const { listningSchema, reviewSchema } = require('../Schema.js');
const Review = require("../models/review.js");
const reviews = require("../routes/reviews.js");



//Reviews
router.post("/", wrapAsync(async (req, res) => {

    let listing = await Listing.findById(req.params.body);
    let newReview = new Review(req.body.reviews);

    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();

    res.send("Send");

}));

module.express = router;