const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsyc.js");
const { listningSchema, reviewSchema } = require('../Schema.js');
const Listing = require("../models/listings.js");



//Index Route
router.get("/", wrapAsync(async (req, res) => {

    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });

}));

router.get("/new", wrapAsync(async (req, res) => {

    res.render("listings/new.ejs")

}));
//Show Route

router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listings = await Listing.findById(id);
    res.render("listings/show.ejs", { listings })

}));

// create express.Router

router.post("/", wrapAsync(async (req, res, next) => {
    let resu = listningSchema.validate(req.body);
    const newListing = await new Listing(req.body.listing);
    await newListing.save();
    // req.flash("Success","New Listing Created")

    res.redirect("/listings");
 
}));

router.get("/:id/edit", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listings = await Listing.findById(id);
    res.render("listings/edit.ejs", { listings })
}));

router.delete("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listings = await Listing.findByIdAndDelete(id);
    console.log(listings);
    res.redirect("/listings");
}));

router.put("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listings = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect("/listings");

}));


module.exports = router;