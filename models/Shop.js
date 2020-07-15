const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const shopSchema= new Schema({
  name :String,
  email : String,
  pass : String,
  date :{
    type : Date, 
    default : Date.now
  },
  googleid : String,
  shopname : String,
  image : String,
  Updated:String,
  City :String,
  State : String,
  Area : String,
});

const Shop=mongoose.model('shop',shopSchema);

module.exports = Shop;