// client-side javascript for homepage functions
// handles what information to display on homepage and calling of routes

$(document).ready(function() {
// makes sure nothing runs until page has completed loading
// wraps everything so not indenting formatting here since it would just shift entire page over



// ====================== GLOBAL VARIABLES ======================== //
var articleBox = $(".article-box");
// references the div where all the articles should be displayed
// ====================== END GLOBAL VARIABLES ======================== //



// ====================== FUNCTIONS ======================== //

// Initialize Page/Reset Page
function initializePage() {
    // Empty the article-box div
    articleBox.empty();
    
    //AJAX request for unsaved articles
    $.get("/api/articles?saved=false")
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
    var articlesToPrint = [];

    for (var i = 0; i < articles.length; i++) {
        var currentArticle = articles[i];
        articlesToPrint.push(createListing(currentArticle));        
    }
    // after all the listings have been created and added to the array
    // append to the articleBox container
    articleBox.append(articlesToPrint);
};
// END PRINT ARTICLES


// CREATE SINGLE ARTICLE LISTING
    // this will be called in printArticles, but writing as standalone because it could be reused
    // this creates a single listing for an article from the scraped data
    /* to keep it simple I am starting this using jquery, but would be better to
    create a handlebars object and have handlebars deal with the layout and rendering
    if I want to use more advanced formatting later */
    function createListing(currentArticle) {
        var listing = $("<div class='panel panel-default'>" +
            "<h3><a href='" + currentArticle.articleUrl + "'> " + currentArticle.articleTitle + "</a></h3>" +
            "<p>" + currentArticle.articleSummary+ "<br />" +
            "<a class='btn btn-success save'> Save Article </a>" +
            "</p>" +
            "</div>"
        );

        //then attach item id to the element
        listing.data("_id", currentArticle._id);
        
        // return the constructed listing
        return listing;
    }


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



// SAVE ARTICLE FUNCTION
function handleArticleSave() {
    //triggered when user hits button to save an article
    //starts by retrieving the article id that was attached to the element when it was setup
    var articleToSave = $(this).parents(".panel").data();
    articleToSave.saved = true;

    //AJAX update call
    // patch method should be correct for updating an existing database entry
    $.ajax({
        method: "PATCH",
        url: "/api/articles",
        data: articleToSave
    })
    .then(function(data){
        //if successful mongoose will send back "ok: true" so can use this to check for success
        if (data.ok) {
            //run initialize page function again to reload the page
            initializePage();
        }
    });
};
// END SAVE ARTICLE FUNCTION


// SCRAPE ARTICLE FUNCTION
function handleArticleScrape() {
    //triggers when user clicks a button to scrape new articles
    $.get("/api/fetch")
        .then(function(data) {
            initializePage();
            //may add a section telling user how many new articles were scraped here, but leaving out for now

        });
}
// END SCRAPE ARTICLE FUNCTION


// ====================== END FUNCTIONS  ======================== //



// ====================== MAIN PROGRAM FLOW  ======================== //
/* add event listeners to dynamically generated
buttons- both "save article" and "scrape new article"*/
$(document).on("click", ".btn.save", handleArticleSave);
$(document).on("click", ".new-scrape", handleArticleScrape);

//call initialize page function first thing once page is ready
initializePage();

// ====================== END MAIN PROGRAM FLOW  ======================== //
}); 