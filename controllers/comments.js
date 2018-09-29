//controller file for comments
// ============================

//import comment model and setupDate script
var Comment = require("../models/CommentModel");
var setupDate = require("../scripts/dateformat");

module.exports = {
    //note- no fetch or scrape functions because all data created by users, nothing to scrape
    // setup our Read CRUD function with .get
    // get all comments associated with our articles
    get: function(data, callback) {
        Comment.find({
            _eventArticleId: data._id
        },
        callback);
    },
    save: function(data, callback) {
        var newComment = {
            _eventArticleId: data._id,
            postedDate: setupDate(),
            commentText: data.commentText,
            commentAuthor: data.commentAuthor            
        };

        Comment.create(newComment, function(error, document) {
            if (error) {
                console.log(error);
            }
            else {
                console.log(doc);
                callback(doc);    
            }
        });
    },
    delete: function(data, callback) {
        Comment.remove({
            _id: data._id
        },
        callback);
    }
}
