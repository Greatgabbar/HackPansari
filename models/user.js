const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema= new Schema({
  name :String,
  email : String,
  pass : String,
  date :{
    type : Date, 
    default : Date.now
  },
  googleid : String,
  image : String,
  username:String,
  City :String,
  State : String,
  Area : String,
  Updated : {
    type:Boolean,
    default: false
  }
});

const User=mongoose.model('user',userSchema);

module.exports = User;