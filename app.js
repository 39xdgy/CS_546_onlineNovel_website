const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const configRoutes = require('./routes');
const exphbs = require('express-handlebars');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const static = express.static(__dirname + '/public');
app.use('/public', static);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.set('views', path.join(__dirname, 'views'));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(session({
    name: 'AuthCookie',
    secret: 'some secret string!',
    resave: false,
    saveUninitialized: true
})) 

app.use("/", async(req,res,next)=>{
 
  
  if(!req.session.AuthCookie 
    && req.originalUrl!="/users/login"
    && req.originalUrl!="/users/createUser"
    && req.originalUrl!="/users/logout"
    && req.originalUrl!="/home")
  {
    res.status(401);
    //should redirect to home page once home page is ready
    //res.redirect();
    res.json({Message: "Not Authorized"});
  }
  next();
});

app.use("/login", async(req,res,next)=>{
  if(req.session.AuthCookie)  
    res.redirect("/users/profile");
    next();
});



configRoutes(app);
app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});

