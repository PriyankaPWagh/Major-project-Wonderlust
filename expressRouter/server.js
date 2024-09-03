const express=require("express");
const app=express();
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

const sessionOptions = {
  secret:process.env.SECRET,
  resave:false, 
  saveUninitialized:true
}





app.use(session(sessionOptions));
app.use(flash());
app.use((req,res,next) =>{
  res.locals.successMsg = req.flash("success");
  res.locals.errorMsg = req.flash("error");
  next();
});


app.set("view engine" ,"ejs");
app.set("views" , path.join(__dirname,"views"));

app.get("/register",(req,res) =>{
  let {name = "anonymous"} = req.query;
  // console.log(req.session);
  req.session.name=name;

if(name === "anonymous"){
  req.flash("error","user not registered");
}else{
  req.flash("success","user registered successfully");
}

  console.log(req.session.name);
  // // res.send(name);
  res.redirect("/hello");
});

app.get("/hello",(req,res) =>{
  // res.send(`hello ${req.session.name}`);
  // console.log(req.flash("success"));
  
  res.render("page.ejs",{name : req.session.name});
});

// reqcount
// app.get("/reqcount",(req,res) =>{
//   if(req.session.count){
//     req.session.count++
//   }else{
//     req.session.count = 1;
//   }
 
//   res.send(`You sent a request ${req.session.count} time`);
// });




// app.get("/test" , (req,res) =>{
//   res.send("test success");
// });



app.listen(3000, ()=>{
  console.log("server is listening on port 3000");
});









// app.use(cookieParser("secretecode"));
// app.get("/getsignedcookies",(req,res) =>{
//   res.cookie("madeIn" , "India",{signed:true});
//   res.send("signed cookie send");
// })

// app.get("/getcookies",(req,res) =>{
//   res.cookie("greet" , "hello");
//   res.cookie("made IN" , "india");
//   res.send("send your some cookie");
// });

// app.get("/verify",(req,res) =>{
//   console.log(req.signedCookies);
//   res.send("verify");
// });

// app.get("/greet",(req,res) =>{
//   let {name = "anonymous"} = req.cookies;
//   res.send(`Hi ${name}`);
// });

// app.get("/",(req,res) =>{
//   console.dir(req.cookies);
//   res.send("Hi I am root")
// });


// app.use("/users",users);
// app.use("/posts" , posts);



 

