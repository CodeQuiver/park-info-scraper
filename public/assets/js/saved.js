// client-side javascript for functions on page showing saved articles
// handles what information to display and calling of routes
// also handles the creation and deletion of comments

//****rough draft NOTE- bootbox class, need to either replace or make sure I tie in correctly in my handlebars */

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

// DELETE ARTICLE FUNCTION
// design note- could set up to delete from database, or could set up to "soft delete" by simply toggling the article's "saved" status back to "false"
// this function is the hard-delete option, but I am also including a soft-delete option below
function handleArticleDelete() {
    //triggered when user hits button to delete an article
    //starts by retrieving the article id that was attached to the element when it was setup
    var articleToDelete = $(this).parents(".panel").data();

    //AJAX DELETE call
    $.ajax({
        method: "DELETE",
        url: "/api/articles/" + articleToDelete._id
    })
    .then(function(data){
        //if successful mongoose will send back "ok: true" so can use this to check for success
        if (data.ok) {
            //run initialize page function again to reload the page
            //the reloaded page will then show the saved articles less the deleted one
            initializePage();
        }
    });
};
// END DELETE ARTICLE FUNCTION

// REMOVE FROM SAVED ARTICLES LIST FUNCTION
function handleArticleUndoSave() {
    //triggered when user hits button "remove from saved articles"
    //starts by retrieving the article id that was attached to the element when it was setup
    var articleToSave = $(this).parents(".panel").data();
    articleToSave.saved = false;

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
            //the reloaded page will then show the saved articles less the un-saved one
            initializePage();
        }
    });
};
// END REMOVE FROM SAVED ARTICLES LIST FUNCTION

// ARTICLE COMMENT HANDLER
function handleArticleComments() {
    //handles opening comments modal and displaying comments
    //grab id of the article to get the associated comments
    // get that id from the div.panel the comments button sits inside
    var currentArticle = $(this).parents(".panel").data();
    
    //constructing the url route for the comment
    // then constructing the html for the modal using jQuery
    // uses an array and join for easier reading
    $.get("/api/comments/" + currentArticle._id)
        .then(function(data) {
            var modalContent = [
                "<div class = 'container-fluid text-center'>",
                "<h4>Comments on Article: ",
                currentArticle._id,
                "</h4>",
                "<hr />",
                "<ul class='list-group comment-container'>",
                "</ul>",
                "<textarea class='comment-text-field' placeholder='New Comment' rows='4' cols='60'></textarea>",
                "Posted by: <br />",
                "<input class='comment-author-field' placeholder='Username Here' />",
                "<button class='btn btn-success save'>Save Comment</button>",
                "</div>"
            ].join("");
            //adds the above html to the comment modal
            bootbox.dialog({
                message: modalContent,
                closeButton: true
            });
            var commentData = {
                _id: currentArticle._id,
                comments: data || []
            };
            //add info about the article and notes to the save button for eay access later
            $(".btn.save").data("article", commentData);

            //printCommentsList will add the actual note html inside the opened modal
            printCommentsList(commentData);
        });
}
// END ARTICLE COMMENT HANDLER 



// PRINT COMMENTS LIST FUNCTION
function printCommentsList(data) {
    //this prints the list of comments to the comments modal when called from the comment handler
    //sets up an array of comments to render
    // uses a loop to render each one
    var commentsToPrint = [];
    var currentComment;

    if (!data.comments.length) {
        // if there are no comments on the article, have a message say that
        currentComment = $([
            "<li class='list-group-item'>",
            "This article doesn't have any comments.",
            "</li>"
        ].join(""));
        commentsToPrint.push(currentComment);
    }
    else {
        // else if there are comments to render, loop through them and print each one
        for (var i = 0; i < data.comments.length; i++) {
            currentComment = $([
            "<li class='list-group-item comment'>",
            data.comments[i].commentText,
            "<br />",
            "Posted by: <span class='comment-author'>",
            data.comments[i].commentAuthor,
            "</span>",
            "<button class='btn btn-danger comment-delete'>",
            "Delete Comment</button>",
            "</li>"
            ].join(""));
            // store the comment id as data attached to the delete button for easy access when trying to delete later
            currentComment.children("button").data("_id", data.comments[i]._id);
            // finally, add our current comment to the commentsToPrint array
            commentsToPrint.push(currentComment);
        }
    }
    // append the commentsToPrint to the comment-container inside the comment modal
    $(".comment-container").append(commentsToPrint);
}
// END PRINT COMMENTS LIST FUNCTION



// SAVE COMMENT HANDLER
function handleCommentSave() {
    //this handles what happens when a user tries to save a new comment on an article
    // sets a variable to hold the comment data
    // grabs the note typed into the comment input box (added class comment-text-field to that textarea in my html)
    // grabs the username typed into the username input box (added class comment-author-field to that input html)
    var commentData;
    var newComment = $(".comment-text-field textarea").val().trim();
    var newAuthor = $(".comment-author-field input").val().trim();
    //if there is data in the comment text field and the author field, 
    // format and post to the "/api/comments" route and send the formatted commentData as well
    //else (if either or both are empty) alert user that both fields are required to post a comment
    if (newComment && newAuthor) {
        commentData = {
            _id: $(this).data("article")._id,
            commentText: newComment,
            commentAuthor: newAuthor
        };
        $.post("/api/comments", commentData).then(function() {
            //when post is done, close the modal
            bootbox.hideAll();
        });
    }
    else {
        alert("We're sorry, your comment couldn't be added because information was missing. Please fill out both fields to submit a comment.");
    };
}
// END SAVE COMMENT HANDLER



// DELETE COMMENT HANDLER
function handleCommentDelete() {
    // handles when a user clicks the delete button on a comment
    // for now, since there's no way to track different users, any user can delete any comment
    /* later wouold probably want to improve this with at minimum making it a soft delete only
    (like the "un-save" comment deletion function above),
    or more ambitiously by adding a system where a user must be logged
    in and then can only delete their own comments*/

    var commentToDelete = $(this).data("_id");
    //pulls the _id identifier from the data stored in the delete button
    // and attaches it to commentToDelete for use in the AJAX request
    
    // AJAX delete request
    $.ajax({
        url: "/api/comments/" + commentToDelete,
        method: "DELETE"
    }).then(function() {
        // when deletion is complete, hide the modal
        bootbox.hideAll();
    });
}
// END DELETE COMMENT HANDLER




// ====================== END FUNCTIONS  ======================== //



// ====================== MAIN PROGRAM FLOW  ======================== //
//call initialize page function first thing once page is ready
initializePage();

/*  then add event listeners to dynamically generated
buttons- "permanently delete article", "remove from saved articles", 
"view comments", "save comment", "delete comment" */
$(document).on("click", ".btn.delete", handleArticleDelete);
$(document).on("click", ".btn.unsave", handleArticleUndoSave);
$(document).on("click", ".btn.comments", handleArticleComments);
$(document).on("click", ".btn.save", handleCommentSave);
$(document).on("click", ".btn.comment-delete", handleCommentDelete);

// ====================== END MAIN PROGRAM FLOW  ======================== //




});    