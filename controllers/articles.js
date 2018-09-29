//import scrape script and setupDate script
var scrape = require("../scripts/scrape");
var setupDate = require("../scripts/dateformat");

//import article and comment models
var Article = require("../models/ArticleModel");
var Comment = require("../models/CommentModel");

module.exports = {
    //fetch = Create CRUD function
    fetch: function(callback) {
        scrape(function(data) {
            var articles = data;
            
            for (var i=0; i<articles.length; i++){
                articles[i].date = makeDate();
                articles[i].saved = false;
            }

            Article.collection.insertMany(
                articles,
                {ordered: false},
                function(error, documents) {
                    callback(error, documents);
                }
            ); //Mongo function that inserts multiple articles into the collection, and doesn't make them be inserted in any order
            //if any errors occur the function will keep going and simply return the errors

        })
    },
    // get = Read CRUD function
    get: function(query, callback) {
        Article.find(query)
        .sort({
            _id: -1
        })
        .exec(function(error, document) {
            callback(document);
        });        
    },
    //Update CRUD function
    update: function(query, callback) {
        Article.update(
            {
                _id: query._id
            },
            {
                $set: query
            },
            {},
            callback
        );
    },
    //Delete CRUD function
    delete: function(query, callback) {
        Article.remove(query, callback);
    }
}