// client-side javascript for homepage functions
// handles what information to display on homepage and calling of routes

$(document).ready(function() {
// makes sure nothing runs until page has completed loading
// wraps everything so not indenting formatting here since it would just shift entire page over


// ====================== GLOBAL VARIABLES ======================== //
var articleBox = $(".article-box");
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


// ====================== END FUNCTIONS  ======================== //



// ====================== MAIN PROGRAM FLOW  ======================== //
//call initialize page function first thing once page is ready
initializePage();

// ====================== END MAIN PROGRAM FLOW  ======================== //




});    