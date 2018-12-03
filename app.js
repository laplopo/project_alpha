var express         = require("express"),
    app             = express(),
    
    bodyParser      = require("body-parser"),
    
    mongoose        = require("mongoose"),

    methodOverride  = require("method-override"),
    //seedDB          = require("./seeds"),
    flash           = require("connect-flash"),
    
    LocalStrategy   = require("passport-local"),
    passport        = require("passport"),
    

    User            = require("./models/user");

// date    


//date 


var commentRoutes       = require("./routes/comments"),
    postRoutes          = require("./routes/posts"),
    indexRoutes         = require("./routes/index");

console.log(process.env.DATABASEURL);

setTimeout(function() {}, 10);


mongoose.connect(process.env.DATABASEURL, { useNewUrlParser: true });


// https://www.npmjs.com/package/body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

// https://www.npmjs.com/package/method-override
app.use(methodOverride("_method"));
// https://www.npmjs.com/package/connect-flash
app.use(flash());
// seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Mindenki tudja mi az o feladata",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(indexRoutes);
app.use(postRoutes);
app.use(commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Face Server at your service");
})