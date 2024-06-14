const mongoose=require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");


main()
.then(() =>{
    console.log("connection successfull");
}) .catch((err) =>{
    console.log(err);
})


async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wonderlust");
}



const initDb = async ()=>{
   await Listing.deleteMany({});
   initData.data=initData.data.map((obj)=>({...obj, owner:"6667c6cb154a4e2641fcb6cc"}));
   await Listing.insertMany(initData.data);
   console.log("data was initialized");
}

initDb();