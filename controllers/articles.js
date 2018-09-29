//import scrape script and setupDate script
var scrape = require("../scripts/scrape");
var setupDate = require("../scripts/dateformat");

//import article and comment models
var Article = require("../models/ArticleModel");
var Comment = require("../models/CommentModel");

module.exports = {
    fetch: function (callback) {
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
    }
}