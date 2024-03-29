const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");
const mongoose = require("mongoose");
const socket = require("socket.io");
const flash = require("connect-flash");
const session = require("express-session");
const Shop = require("./models/Shop");
const auth = require("./config/auth");
const Chat = require("./models/chat");
const passportSet = require("./config/passport-setup");
require("./config/passport-setup-local")(passport);
const Order = require("./models/Order");
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "customer.pansari@gmail.com",
    pass: "Rupali@1",
  },
});

mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(express.static("public"));

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error = req.flash("error");
  res.locals.chat = req.user;
  next();
});

app.use("/auth", require("./routes/auth-routes"));

app.use("/user", require("./routes/user-routes"));

app.get("/chat", (req, res) => {
  res.sendFile(__dirname + "/public/assets/index.html");
});

app.get("/api/users", (req, res) => {
  res.json(req.user);
});

app.post("/api/order", (req, res) => {
  const { orders, to, from, address } = req.body;
  console.log(req.body);
  const mailOptions = {
    from: "customer.pansari@gmail.com",
    to: from.email,
    subject: "Order Recieved",
    text: "We Have Recieved your order and we are processing it",
  };
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log("email sent!!!", data);
    }
  });

  const order = new Order({
    order: orders,
    to: to.id,
    from: from.id,
    fromName: from.name,
    fromLocation: from.location,
    fromEmail: from.email,
    address: address,
  });
  order.save().then((data) => {
    res.send(data);
  });
});

app.get("/", (req, res) => {
  res.redirect("/user/login");
});

app.get("/both", (req, res) => {
  res.render("shop-contomer");
});

app.get("/user/profile/:id", (req, res) => {
  res.render("dashboard-user");
});

app.get("/api/shops", (req, res) => {
  Shop.find({}).then((data) => {
    res.status(200).json(data);
  });
});

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, function () {
  console.log(`running on port number ${PORT}`);
});
