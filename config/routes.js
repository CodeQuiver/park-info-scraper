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
            if (!documents || documents.insertedCount === 0) {
                res.json({
                    message: "No new spotlighted articles today. Check again tomorrow!"
                });
            } else {
                res.json({
                    message: "Added " + documents.insertedCount + " new articles!"
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
    });

    //delete article route, based on passed id
    router.delete("/api/articles/:id", function(req, res) {
        var query = {};

        query._id = req.params.id; //retrieves id from url :id
        articleController.delete(query, function(err, data) {
            res.json(data);
        });
    });

    //update article route (.patch)
    router.patch("/api/articles", function(req, res) {
        articleController.update(req.body, function(err, data) {
            res.json(data);
        });
    });

    //get all comments associated with an article
    router.get("/api/comments/:article_id?", function(req, res) {
        var query = {};

        if (req.params.article_id) {
            query._id = req.params.article_id;
            //if there is an article id specified in the url, get the id of the article
        }

        commentsController.get(query, function(err, data) {
            res.json(data);
        });
    });

    //delete a comment
    router.delete("/api/comments/:id", function(req, res) {
        var query = {};
        query._id = req.params.id; //pull id of comment from request url
        commentsController.delete(query, function(err, data) {
            res.json(data);
        });
    });

    //post a new comment on an article
    router.post("/api/comments", function(req, res) {
        commentsController.save(req.body, function(data){
            res.json(data);
        });
    });

    // === END API Routes ===== //
}