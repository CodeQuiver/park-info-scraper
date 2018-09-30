// client-side javascript for homepage functions
// handles what information to display on homepage and calling of routes

$(document).ready(function() {
// makes sure nothing runs until page has completed loading
// wraps everything so not indenting formatting here since it would just shift entire page over



// ====================== GLOBAL VARIABLES ======================== //
var articleBox = $(".article-box");
// ====================== END GLOBAL VARIABLES ======================== //



// ====================== FUNCTIONS ======================== //

// Initialize Page/Reset Page
function initializePage() {
    // Empty the article-box div
    articleBox.empty();
    
    //AJAX request for unsaved articles
    $.get("/api/headlines?saved=false")
        .then(function(data) {
            if (data && data.length) {
                // if unsaved articles found, render with printArticles function
                printArticles(data);
            } 
            else {
                // else render "no articles" message using printEmpty function 
                printEmpty();
            } 
        });
};
// END Initialize Page/Reset Page


// PRINT ARTICLES to the article-box div
function printArticles(articles) {
    //function takes in a JSON array containing all articles in database
    // pass each item in array to the "createListing" function

};
// END PRINT ARTICLES


// CREATE SINGLE ARTICLE LISTING
    // this will be called in printArticles, but writing as standalone because it could be reused
    // this creates a single listing for an article from the scraped data
    //******* to keep it simple I am starting this using jquery, but I should probably instead create a handlebars object and have handlebars deal with the layout and rendering *****
// END CREATE SINGLE ARTICLE LISTING


// PRINT "NO ARTICLES" MESSAGE
function printEmpty() {
    // renders message explaining that we don't have any articles
    // also asks user what they'd like to do and renders links for those choices
    // set this up as a several concatenated lines for ease of reading
    var emptyAlert = 
    $("<div class='alert alert-warning text-center'>" +
    "<h4>No new articles are available.</h4>" +
    "</div>" +
    "<div class='panel panel-default'>" +
    "<div class='panel-heading text-center'>" +
    "<h4><a class='new-scrape'>Scrape New Articles</a></h4>" +
    "<h4><a href='/saved'>Go To Saved Articles</a></h4>" +
    "</div>" +
    "</div>"
    );

    //append emptyAlert to the articleBox div
    articleBox.append(emptyAlert);
    
};
// END PRINT "NO ARTICLES" MESSAGE


// ====================== END FUNCTIONS  ======================== //



// ====================== MAIN PROGRAM FLOW  ======================== //
    // first reference the div where all the articles should be displayed
    /*  then add event listeners to dynamically generated
    buttons- both "save article" and "scrape new article"*/
    $(document).on("click", ".btn.save", handleArticleSave);
    $(document).on("click", ".new-scrape", handleArticleScrape);

    //call initialize page function first thing once page is ready
    initializePage();

// ====================== END MAIN PROGRAM FLOW  ======================== //
});