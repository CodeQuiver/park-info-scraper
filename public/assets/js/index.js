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
            /* if unsaved articles found, render with printArticles function*/
            if (data && data.length) {
                printArticles(data);
            } 
            /* else render "no articles" message using printEmpty function */
            else {
                printEmpty();
            } 
        });
};
// END Initialize Page/Reset Page


// PRINT ARTICLES to the article-box div
function printArticles(articles) {

};
// END PRINT ARTICLES


// PRINT "NO ARTICLES" MESSAGE
function printEmpty() {
    
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