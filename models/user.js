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
  image : String
});

const User=mongoose.model('auth',userSchema);

module.exports = User;