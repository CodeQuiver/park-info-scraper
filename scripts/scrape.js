//script to set up scraping with request and cheerio

var request = require("request");
var cheerio = require("cheerio");

//step 1- review park service website and identify the classes and tags around each piece of information we need
    //we need: article title, summary, url of full article
//step 2 - navigate page using cheerio to scrape the items above

var scrape = function(callback) {
    request("https://parks.arlingtonva.us", function(error, response, body){
        var $ = cheerio.load(body); //sets $ as the selector, similat to jQuery

        var articleArray = [];

        // console.log(body);

        //SCRAPE HIGHLIGHTS SECTION
            // each of these sections is labeled "text-with-photo-gizmo"
        $(".text-with-photo-gizmo").each(function(i, element) {
            var title = $(this).children("h2").text().trim(); // get title from h2
            var summary = $(this).children(".blurb").text().trim(); // get summary from div.blurb
            var link = $(this).children("a").attr('href'); // get any links with href

            if (title && summary && link) {
                var infoToPush = {
                    articleTitle: title,
                    articleSummary: summary,
                    articleUrl: link
                };
                
                articleArray.push(infoToPush);

            } else if (title && summary) {
                var infoToPush = {
                    articleTitle: title,
                    articleSummary: summary
                };
                
                articleArray.push(infoToPush);

            } else if (title && link) {
                var infoToPush = {
                    articleTitle: title,
                    articleUrl: link
                };
                
                articleArray.push(infoToPush);
                
            } else {
                console.log("a headline was not scraped due to lack of information available");
                continue;
            };

            callback(articleArray);
        });

        //END SCRAPE HIGHLIGHTS SECTION

        
        //SCRAPE SLIDESHOW SECTION
        //targeting the slideshow first since it includes some things not in rest of page, seems to be the actual most important items
        // $(".slide").each(function(i, element) {
            
                // pull blurb (becomes summary in model)
                    // ".blurb" text
                // pull item url
                    // "a href" value

                //nest another request inside that requests from the item url page so we can go get a title
                        // pull title of page from head (becomes articleTitle)
                            // (OPTIONAL- regex to remove "Arlington Parks" or "Parks and Recreation" if those exact phrases are there, or possibly everything after a " - " separator because usual syntax is name then separator then the repetitive page designation)
                        // return title to outer function
            
        // });
        //END SCRAPE SLIDESHOW SECTION


        //SCRAPE LATEST NEWS SECTION
            // section identified by "ul.display-posts-listing" (each link is within an li tag)
            // pull each url listed (will be checked for redundancy by database later)
                //nest another request inside that requests from the item url page so we can go get a title
                        //pull title of page from head 
                            // (OPTIONAL- regex to remove "Arlington Parks" or "Parks and Recreation" if those exact phrases are there, or possibly everything after a " - " separator because usual syntax is name then separator then the repetitive page designation)
                        //SECONDARY- pull first paragraph or first x characters of content for summary (if there is more, place a "..." at end- will add a read more/all details link to all listings on front-end, but this will add the indication that this blurb is incomplete to the blurb itself.)
                        // return title to outer function
        //END SCRAPE LATEST NEWS SECTION
    });    
};

module.exports = scrape;