const express = require('express')
const app = express()
const mongoose = require('mongoose');
const path = require("path");
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
const ejsMate = require("ejs-mate");
// const initData = require("./init/data.js"); 
const listings = require("./routes/listing.js");
const session = require("express-session");
// const reviews = require("../routes/reviews.js");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStratgy = require("passport-local");
const User = require("./models/user.js");

const port = 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

main().then((res) => {
    console.log("Connecetion is good");
}).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

app.use(express.urlencoded({ extended: true }));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));


app.use("/listings", listings);

const sessionOption = {
    secrete: "mysupersecreatecode",
    resave: false,
    saveUninitialized: true,
    // cookie: {
    //     expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    //     maxAge: 7 * 24 * 60 * 60 * 1000,
    // },
    // httptOnly:true,
};


app.use(passport.initialize());
app.use(passport.session);
passport.use(new LocalStratgy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/demo",async()=>{
    let fackUser = new User({
        email:"irfan@gmail.com",
        username:"@hello",
    });
let register = await User.register(fackUser, "helloworld");
res.send(register);
})


app.get("/",(req,res)=>{
    res.send("Hye I am root");
});

// app.use((req,res,next)=>{
//     res.locals.success = req.flash("success");
//     next();
// });

app.use(session(sessionOption));
// app.use(flash());



app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});


app.use((err, req, res, next) => {
    let { statusCode = 501, message } = err;
    res.status(statusCode).send(message);
});



app.listen(port, (req, res) => {
    console.log(`Server is listning at ${port}`)
});
