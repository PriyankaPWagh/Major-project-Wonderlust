if(process.env.NODE_ENV != "production"){
require('dotenv').config();
}
console.log(process.env.SECRET) 

const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path =require("path");
const methodOverride=require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const sessionOptions = {
  secret:"mysupersecretestring",
  resave:false, 
  saveUninitialized:true,
  cookie : {
    expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge : 7 * 24 * 60 * 60 * 1000,
    httpOnly : true,
  },
}

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next) =>{
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;

  next();
});

const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const usersRouter = require("./routes/user.js");


main()
.then(() =>{
    console.log("connection successfull");
}) .catch((err) =>{
    console.log(err);
})


async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wonderlust");

}
app.set("view engine" ,"ejs");
app.set("views" , path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs" , ejsMate);
app.use(express.static(path.join(__dirname , "/public")));

// app.get("/demouser",async(req,res) =>{
//   let fakeUser = new User ({
//     email:"delta @gmail.com",
//     username:"delta-student"
//   });
//   let registeredUser = await User.register(fakeUser,"helloWorld");
//   res.send(registeredUser);
// })



app.use("/listings" ,listingsRouter);
app.use("/listings/:id/reviews",reviewsRouter);
app.use("/",usersRouter);


// app.get("/",(req,res) =>{
//     res.send("hi welcome and make the project with understanding");
// });
app.all("*",(req,res,next) =>{
  next(new ExpressError(404,"Page Not Found"));
});


// middleware
app.use((err,req,res,next) =>{
  let {statusCode=500,message="something went wrong"}=err;
 console.log(`message ${message}`);
res.status(statusCode).render("error.ejs",{message});
req.flash("error",message);


// 
// next();
});


app.listen(8080,() =>{
  console.log("server is listening on port 8080");
});






// app.get("/testListing", async (req,res) =>{
//    let sampleListing = new Listing({
//     title:"my home",
//     description: "my peaeful place",
//     price:1200,
//     location:"banglore",
//     country:"India"

//    });

//   await sampleListing.save();
//   console.log("samplelisting was saved");
//   res.send("success");
// })




    // console.log(listing);
//    let newListing=new Listing({
//     title:title,
//     image:image,
//     description:description,
//     price:price,
//     location:location,
//     country:country,
//    });
//    newListing.save()
//    .then((res) =>{
//     console.log("listing save");

//    })
//    .catch((err) =>{
//     console.log(err);
    
//    })
