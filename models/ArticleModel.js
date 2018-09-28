var mongoose = require("mongoose");

var Schema = mongoose.Schema;

// this is the schema for the object containing the info for each event scraped
// will need to adjust to info available but setting up with basic data wanted for now
var eventArticleSchema = new Schema({
    eventName: {
        type: String,
        required: true,
        unique: true
    },
    summary: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    eventDate: {

    },
    eventTime: {

    },
    postedDate: {

    }
});