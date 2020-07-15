const express=require('express');
const app=express();
const passport=require('passport');
const mongoose=require('mongoose');
const socket=require('socket.io');  
const flash=require('connect-flash');
const session=require('express-session');
const auth=require('./config/auth');
const Chat=require('./models/chat');
const passportSetup = require('./config/passport-setup-shop');
require('./config/passport-setup-shop-local')(passport);

mongoose.connect('mongodb+srv://root:9755@cluster0-n1q9f.mongodb.net/test?retryWrites=true&w=majority',{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.set('view engine','ejs');

app.use(express.urlencoded({extended:false}));

app.use(express.static('public'))

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}))

app.use(passport.initialize());
app.use(passport.session());


app.use(flash());

app.use((req,res,next)=>{
  res.locals.success_msg=req.flash('success_msg');
  res.locals.error =req.flash('error');
  res.locals.chat=req.user;
  next();
})


app.use('/auth',require('./routes/auth-routes-shop'));

app.use('/shop',require('./routes/shop-routes'));
// !Delete these only
app.get('/jayant',(req,res)=>{
  res.render('dashboard-shop');
})
app.get('/jayant/history',(req,res)=>{
  res.render('history-shop');
})

app.get('/',(req,res)=>{
  res.render('profileUpdate-shop');
})

const server=app.listen(5000,function(){
  console.log('running on port number 5000');
});