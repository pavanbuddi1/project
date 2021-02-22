const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const session = require('express-session')
const morgan = require('morgan');
const mongoose = require('mongoose');

//const connection = require('./client/passport/database/index')
const MongoStore = require('connect-mongo') (session)
const passport = require('passport')
//const user = require('./client/passport/database/models/users');
const bodyParser = require('body-parser')
const userRoutes = require('./backend/routes/userRoutes')
const collegeRoutes = require('./backend/routes/collegeRoutes')
// mongoose.connect("mongodb://localhost/mycollegeapp", {useNewUrlParser: true});
mongoose.connect("mongodb://my_college_app:HigherEd1@ds133348.mlab.com:33348/heroku_4ntp5hwr", 
  {
    useNewUrlParser: true
  }
);

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

app.use(session({
  secret: "College",
  resave: false,
  saveUninitialized: false,
  // store: new MongoStore({url:"mongodb://localhost/mycollegeapp"})
}));

app.use(passport.initialize());
app.use(passport.session({secret:"College"}));

require('./backend/config/passportConfig')(passport);

app.use(bodyParser.json())

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here
app.use('/users', userRoutes);
app.use('/save', collegeRoutes);
// app.use('/saved', routes);
// app.use('/saved:id', routes);
// app.use('/save:id', routes);

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
