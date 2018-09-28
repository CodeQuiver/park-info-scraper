//script to set up scraping with request and cheerio

var request = require("request");
var cheerio = require("cheerio");

//step 1- review park service website and identify the classes and tags around each piece of information we need
    //we need: event name, summary, article link, location, event date, event time
    //to begin, we'll only use the event name and summary, once those work we'll add the other pieces of information
//step 2 - navigate page using cheerio to scrape the items above

var scrape = function(callback) {
    request("https://parks.arlingtonva.us", function(error, response, body){
        var $ = cheerio.load(body);

        var eventArticleArray = [];

        $("IDENTIFIER_TO_SCRAPE_HERE").each(function(i, element) {
            // pull each item needed here
        });
    })    
}