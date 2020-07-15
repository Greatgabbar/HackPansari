const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const passport=require('passport');
const mongoose=require('mongoose');
const socket=require('socket.io');  
const flash=require('connect-flash');
const session=require('express-session');
const Shop=require('./models/Shop')
const auth=require('./config/auth');
const Chat=require('./models/chat');
const passportSet=require('./config/passport-setup');
require('./config/passport-setup-local')(passport);
const Order=require('./models/Order');

mongoose.connect('mongodb+srv://root:9755@cluster0-n1q9f.mongodb.net/test?retryWrites=true&w=majority',{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

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

app.use('/auth',require('./routes/auth-routes'));
app.use('/auth',require('./routes/auth-routes-shop'));

app.use('/user',require('./routes/user-routes'));

app.use('/shop',require('./routes/shop-routes'));

app.get('/chat',(req,res)=>{
  res.sendFile(__dirname + '/public/assets/index.html');
});

app.get('/api/users',(req,res)=>{
  res.json(req.user);
})

app.post('/api/order',(req,res)=>{
  const {orders,to,from} = req.body;
  console.log(req.body);
  const order=new Order({
    order:orders,
    to:to,
    from:from
  })
  order.save().then((data)=>{
    res.send(data);
  })
}) 

app.get('/',(req,res)=>{
  res.render('shop-contomer');
})
app.get('/user/profile/:id  ',(req,res)=>{
  res.render('dashboard-user');
})


app.get('/api/shops',(req,res)=>{
  Shop.find({})
    .then((data)=>{
      res.status(200).json(data);
    })
})


const server=app.listen(4000,function(){
  console.log('running on port number 4000');
});