// Server Routes
// ===================

// Import scraper from the scripts folder
var scrape = require("../scripts/scrape");

// Import articles and comments from the controller folder
var articleController = require("../controllers/articles");
var commentsController = require("../controllers/comments");

module.exports = function(router) {
    // === HTML Routes ========= //
    //render the homepage
    router.get("/", function(req,res) {
        res.render("home");
        //knows home means home.handlebars because handlebars was defined as the view engine- or at least it should. Having technical issues.
    });

    //render the "saved" handlebars page
    router.get("/saved", function(req,res) {
        res.render("saved");
    });
    // === END HTML Routes ===== //


    // === API Routes ========= //
    
    //fetch route
    router.get("/api/fetch", function(req,res) {
        articleController.fetch(function(error, documents) {
            if (!docs || docs.insertedCount === 0) {
                res.json({
                    message: "No new spotlighted articles today. Check again tomorrow!"
                });
            } else {
                res.json({
                    message: "Added " + docs.insertedCount + " new articles!"
                });
            }
        });
    });

    // get articles route
    // get all if not specified
    // but if a saved article or other specific parameter
    // is specified, then specifically query that article or parameter
    router.get("/api/articles", function(req, res) {
        var query = {};

        if (req.query.saved) {
            query = req.query;
        }

        articleController.get(query, function(data) {
            res.json(data);
        });
    })


    // === END API Routes ===== //
}