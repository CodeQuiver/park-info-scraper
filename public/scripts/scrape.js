//script to set up scraping with request and cheerio

var request = require("request");
var cheerio = require("cheerio");

//step 1- review park service website and identify the classes and tags around each piece of information we need
    //we need: event name, summary, article link, location, event date, event time

//step 2 - navigate page using cheerio to scrape the items above