const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const listningSchema = new Schema({
    title: {
        type: String,
        required: true,
    },

    description: String,
    image: {
        type: String,
        default: "https://sensorytraining.co.nz/wp/wp-content/uploads/2016/04/fit2-sunset1.jpg",
        // set: (v) => v === "" ? "https://sensorytraining.co.nz/wp/wp-content/uploads/2016/04/fit2-sunset1.jpg" : v,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
});

const Listing = mongoose.model("Listing", listningSchema);
module.exports = Listing;