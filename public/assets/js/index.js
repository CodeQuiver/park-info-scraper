// client-side javascript for homepage functions
// handles what information to display on homepage and calling of routes

$(document).ready(function() {
// makes sure nothing runs until page has completed loading
// wraps everything so not indenting formatting here since it would just shift entire page over

   

// ====================== FUNCTIONS ======================== //

// Initialize Page/Reset Page
function initializePage() {
    // Empty the article-box div
    articleBox.empty();
    
    //AJAX request for unsaved articles

        /* if unsaved articles found, render with printArticles function*/
        

        /* else render "no articles" message using printEmpty function */


};
// END Initialize Page/Reset Page


// PRINT ARTICLES to the article-box div
// END PRINT ARTICLES


// PRINT "NO ARTICLES" MESSAGE
// END PRINT "NO ARTICLES" MESSAGE



// ====================== END FUNCTIONS  ======================== //


// ====================== MAIN PROGRAM FLOW  ======================== //
    // first reference the div where all the articles should be displayed
    /*  then add event listeners to dynamically generated
    buttons- both "save article" and "scrape new article"*/
    var articleBox = $(".article-box");
    $(document).on("click", ".btn.save", handleArticleSave);
    $(document).on("click", ".new-scrape", handleArticleScrape);

    //call initialize page function first thing once page is ready
    initializePage();

// ====================== END MAIN PROGRAM FLOW  ======================== //
});