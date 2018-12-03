// all the middleware goes here
var middlewareObj = {};
var Post = require("../models/post");
var Comment = require("../models/comment");

middlewareObj.checkCommentOwnership = function(req, res, next){
    // is user logged in
    if (req.isAuthenticated()){
        //does user own the comment?
        console.log(req.params);
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if (err){
                res.redirect("back");
            } else {
                if (foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash.error("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash.error("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}
    
middlewareObj.checkPostOwnership = function(req, res, next){
    // is user logged in
    if (req.isAuthenticated()){
        //does user own the campground?
        Post.findById(req.params.id, function(err, foundPost){
            if (err){
                req.flash.error("error", "Post not found");
                res.redirect("back");
            } else {
                if (foundPost.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash.error("error", "You don't have permission to do that!");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash.error("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn =function(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that!");
    res.redirect("/login");
}



module.exports = middlewareObj;