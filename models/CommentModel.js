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
    commentText: String
    });

var Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment; 