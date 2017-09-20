const comments = (function comments() {
    
    
    const comment = {
       createHtmlforComment: function createHtmlforComment() {
           const postDiv = document.getElementById("post-container");
           const commentsContainer = document.createElement("div");
           postDiv.appendChild(commentsContainer);
       }
    }
    return comment;
})();