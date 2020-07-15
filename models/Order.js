const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const orderSchema=new Schema({
  order:{
    type : Object,
  },
  orderCompleted:{
    type : Boolean,
    default: false
  },
  orderAccepted:{
    type : Boolean,
    default: false
  }
});

const Order=mongoose.model('order',orderSchema);

module.exports = Order;
