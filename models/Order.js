const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const orderSchema=new Schema({
  order:{
    type : Array,
  },
  orderCompleted:{
    type : Boolean,
    default: false
  },
  orderAccepted:{
    type : Boolean,
    default: false
  },
  from:{
    type:String
  },
  to:{
    type:String
  }
});

const Order=mongoose.model('order',orderSchema);

module.exports = Order;
