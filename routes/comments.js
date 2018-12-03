var express = require("express");
var router = express.Router();
var Post = require("../models/post");
var Comment = require("../models/comment");
var middleware = require("../middleware");
var urlhandler = require("../public/js/urlhandler.js");

// ------------------
// COMMENTS ROUTES
// ==================

//NEW ROUTE - show comment form
router.get("/posts/:id/comments/new", middleware.isLoggedIn, function(req, res) {
    // find post by id
    Post.findById(req.params.id, function(err, post){
        if (err){
            console.log(err);
        } else {
                res.render("comments/new", {post: post});
        }
    });
});

//CREATE ROUTE - add new comment
router.post("/posts/:id/comments", middleware.isLoggedIn, function(req, res){
    // lookup post by ID
    Post.findById(req.params.id, function(err, post){
        if (err){
            console.log(err);
            res.redirect("/posts");
        } else {
                // create new comment
                Comment.create(req.body.comment, function(err, comment){
                    if (err) {
                        req.flash("error", "Something went wrong");
                    } else {
                        // detect urls in comment and add anchor tags for them
                        comment.content= urlhandler.replaceURLs(comment.content);
                        // add username, id and date to comment
                        comment.author.id = req.user._id;
                        comment.author.username = req.user.username;
                        comment.date = new Date();
                        // save comment
                        comment.save();
                        
                        // connect new comment to post
                        post.comments.push(comment);
                        post.set({"lastUpdate": comment.date})
                        post.save();
                        console.log(post.comments[0]);
                        // redirect to posts page
                        req.flash("success", "Successfully added comment");
                        res.redirect("/posts");
                    }
                });
        }
    });
});

// EDIT ROUTE - show edit comment form
router.get("/posts/:id/comments/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if (err){
            res.redirect("back");
        } else {
            var comment = foundComment;
            // remove anchor tags from comment
            comment.content = urlhandler.removeAnchors(comment.content);
            res.render("comments/edit", {post_id: req.params.id, comment: comment});
        }
    });

});

// COMMENT UPDATE
router.put("/posts/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req,res){
    var comment = req.body.comment;
    // detect urls in comment and add anchor tags for them
    comment.content = urlhandler.replaceURLs(comment.content);
    Comment.findByIdAndUpdate(req.params.comment_id, comment, function(err, updatedComment){
        if (err) {
            res.redirect("back");
        } else {
            res.redirect("/posts");
        }
    });
});

// DESTROY ROUTE
router.delete("/posts/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if (err) {
            res.redirect("back");
        } else {
            req.flash("success", "Comment deleted");
            res.redirect("/posts");
        }
    });
});


module.exports = router;
