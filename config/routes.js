module.exports = function(router) {
    //render the homepage
    router.get("/", function(req,res) {
        res.render("home");
        //knows home means home.handlebars because handlebars was defined as the view engine- or at least it should. Having technical issues.
    });

    //render the "saved" handlebars page
    router.get("/saved", function(req,res) {
        res.render("saved");
    });
}