const express = require('express')
const app = express();
const session = require("express-session");
const flash = require("connect-flash");


// app.use(session({
//  secret:"mysuperscreatsting"
// }));
// app.use(session(sessionOptions));
app.use(flash()); 

app.get("/register", (req,res)=>{
    let {name = "Ananomouse" } = req.query;
    req.session.name = name;
    res.redirect("/hello");
 
});
app.get("/hello", (req,res)=>{
    res.send(`Hello , ${req.session.name}`);
})
app.use(
    session(
        {
            secret:"IAMUSER",
            resave:false,
            saveUninitialized:true,

        }
)
);

app.listen(3000, (req,res)=>{
    console.log("Server is starting successfully.......")
})