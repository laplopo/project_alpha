var express = require("express");
var router = express.Router();
var Post = require("../models/post");
var User = require("../models/user");
var middleware = require("../middleware");
var urlhandler = require("../public/js/urlhandler.js");
var dateformatter = require("../public/js/dateformat.js");

router.get("/posts", function(req, res){
    Post.find({}).sort({lastUpdate: -1}).populate("comments").exec(function (err, allPosts){
        if (err){
            console.log(err);
        } else {
            User.find({}, {username:1, picture:1}, function(err, users){
                if (err){
                    console.log(err);
                } else {
                    res.render("posts/index", {posts:allPosts, users: users, dateformatter: dateformatter});
                }
            });
            
        }
    });
}); 

// CREATE ROUTE
router.post("/posts", middleware.isLoggedIn, function(req, res){
    
    // get data from form and add to campgrounds array
    var content = req.body.content;
    content = urlhandler.replaceURLs(content);
    var date = new Date();
    var lastUpdate = date;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newPost= {content: content, author: author, date: date, lastUpdate: lastUpdate};
    //Create a new campground and save to DB
    Post.create(newPost, function(err, newlyCreated){
        if (err){
            console.log(err);
        } else {
            res.redirect("/posts");
        }
    });
});

// NEW ROUTE
router.get("/posts/new", middleware.isLoggedIn, function(req, res) {
    res.render("posts/new");
});


// // SHOW 
// router.get("/posts/:id", function(req, res) {
//     //find the post with the ID
//     Post.findById(req.params.id).populate("comments").exec(function(err, foundPost){
//         if (err) {
//             console.log(err);
//         } else {
//             //render show
//             res.render("posts/show", {post: foundPost});
//         }
//     });
// });

// EDIT ROUTE - shows edit form
router.get("/posts/:id/edit", middleware.checkPostOwnership, function(req, res) {
    Post.findById(req.params.id, function(err, foundPost){
        var post = foundPost;
        post.content = urlhandler.removeAnchors(post.content);
        res.render("posts/edit", {post: post});
    });
});



// UPDATE ROUTE
router.put("/posts/:id", middleware.checkPostOwnership, function(req, res){
    //find and update the correct Post
    var lastUpdate = new Date();
    var content = urlhandler.replaceURLs(req.body.post.content);
    Post.findByIdAndUpdate(req.params.id, { "$set": {"content": content, "lastUpdate": lastUpdate}}, function(err, updatedPost){
        if (err){
            res.redirect("/posts");
        } else {
            res.redirect("/posts/");
        }
    });
});

// DESTROY ROUTE
router.delete("/posts/:id", middleware.checkPostOwnership, function(req, res){
    Post.findByIdAndRemove(req.params.id, function(err){
        if (err) {
            res.redirect("/posts");
        } else {
            res.redirect("/posts");
        }
    });
});




module.exports = router;

