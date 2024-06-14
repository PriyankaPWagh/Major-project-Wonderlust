const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review=require("./review.js");



const listingSchema = new Schema({
    title:{
       type: String,
       required:true,
    },
    description:String,
    image:{
       type: String,
      
       default:"https://rukminim2.flixcart.com/image/850/1000/kgsb1jk0-0/poster/n/h/y/medium-twfnp2-beautiful-waterfall-nature-view-large-size-high-original-imafwy37qv2b5g3v.jpeg?q=90&crop=false",
       set:(v) => v === ""? "https://rukminim2.flixcart.com/image/850/1000/kgsb1jk0-0/poster/n/h/y/medium-twfnp2-beautiful-waterfall-nature-view-large-size-high-original-imafwy37qv2b5g3v.jpeg?q=90&crop=false"
       : v,
    },
    price:Number,
    location:String,
    country:String,
   reviews:[
      {
         type : Schema.Types.ObjectId,
         ref: "Review",
      },
   ],
   owner:{
      type:Schema.Types.ObjectId,
      ref:"User",
   },


});
listingSchema.post("findOneAndDelete",async(listing) =>{
   if(listing){
      await Review.deleteMany({_id:{$in:listing.reviews}});
   }
});


const Listing = mongoose.model("Listing",listingSchema );
module.exports = Listing;