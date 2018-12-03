var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");



// root route
router.get("/", function(req, res){
    res.render("landing");
});

// about page
router.get("/about", function(req, res) {
    res.render("about");
});

// =============
// AUTH ROUTES
// =============

// show register form
router.get("/register", function(req, res) {
    res.render("register");
});

// handle signup logic
router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username, picture: "/imgs/npc4.jpg"});
    User.register(newUser, req.body.password, function(err, user){
        if (err){
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to the Jungle " + user.username);
            res.redirect("/posts");
        });
    });
});

// ===========
// LOGIN ROUTES
// ===========

// show login form
router.get("/login", function(req, res) {
    res.render("login");
});

// handling login logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/posts",
        failureRedirect: "/login",
        successFlash: true
    }), function(req, res) {
});

// handling logout
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/posts");
});


module.exports = router;