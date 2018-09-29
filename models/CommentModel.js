var mongoose = require("mongoose");

var Schema = mongoose.Schema;

// this is the schema for the object containing a user comment
var commentSchema = new Schema({
    //first is the foreign ket linking to the eventArticle the comment is related to
    _eventArticleId: {
        type: Schema.Types.ObjectId,
        ref: "eventArticle"
    },
    postedDate: String,
    commentText: String,
    commentAuthor: String
    /* Added commentAuthor so users can sign their comments. 
    They must enter it fresh every time, but this is still realistic
    and can still be useful. 
    There are websites where this is the method and many 
    users use the same name regularly anyway. */
    });

var Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment; 