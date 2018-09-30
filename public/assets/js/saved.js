// client-side javascript for functions on page showing saved articles
// handles what information to display and calling of routes
// also handles the creation and deletion of comments

$(document).ready(function() {
// makes sure nothing runs until page has completed loading
// wraps everything so not indenting formatting here since it would just shift entire page over


// ====================== GLOBAL VARIABLES ======================== //
var articleBox = $(".article-box");
// references the div where all the articles should be displayed
// ====================== END GLOBAL VARIABLES ======================== //



// ====================== FUNCTIONS  ======================== //

// Initialize Page/Reset Page
function initializePage() {
    // Empty the article-box div
    articleBox.empty();
    
    //AJAX request for saved articles
    $.get("/api/articles?saved=true")
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

// PRINT "NO ARTICLES" MESSAGE
function printEmpty() {
    // renders message explaining that there are no saved articles
    // also asks user if they'd like to go back to the homepage to browse unsaved articles and renders link back to home
    // set this up as a several concatenated lines for ease of reading
    var emptyAlert = 
    $("<div class='alert alert-warning text-center'>" +
    "<h4>No saved articles are available.</h4>" +
    "</div>" +
    "<div class='panel panel-default'>" +
    "<div class='panel-heading text-center'>" +
    "<h4><a href='/'>Browse All Available Articles</a></h4>" +
    "</div>" +
    "</div>"
    );

    //append emptyAlert to the articleBox div
    articleBox.append(emptyAlert);    
};
// END PRINT "NO ARTICLES" MESSAGE

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
        "<a class='btn btn-info comments'>Article Comments</a>" +
        "</p>" +
        "</div>"
    );

    //then attach item id to the element
    listing.data("_id", currentArticle._id);
    
    // return the constructed listing
    return listing;
}
// END CREATE SINGLE ARTICLE LISTING

// ====================== END FUNCTIONS  ======================== //



// ====================== MAIN PROGRAM FLOW  ======================== //
//call initialize page function first thing once page is ready
initializePage();

/*  then add event listeners to dynamically generated
buttons- "delete article", "view comments", "save comment", "delete comment" */
$(document).on("click", ".btn.delete", handleArticleDelete);
$(document).on("click", ".btn.comments", handleArticleComments);
$(document).on("click", ".btn.save", handleCommentSave);
$(document).on("click", ".btn.comment-delete", handleCommentDelete);

// ====================== END MAIN PROGRAM FLOW  ======================== //




});    