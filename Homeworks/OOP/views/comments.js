/*global Comments*/

function getUrlParam(name){
  var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
  if (results==null){
    return null;
  }else{
    return results[1] || 0;
  }
}


let commentsId = getUrlParam("id");
window.addEventListener("load", function() {
   const comments = new Comments();
   const commentsRequest = comments.getComments(commentsId);
   createCommentsContainer();
   
   commentsRequest.then(() => {
       comments.commentsArr.forEach((x) => {
           console.log(comments);
           displayComments(x);
       })
   })
   
   function createCommentsContainer() {
       const postContainer = document.getElementById(`post-id`);
       const commentsContainer = document.createElement("div");
       const backLink = document.createElement("a");
       backLink.href = "https://preview.c9users.io/voju/scoala_informala_voju/Homeworks/OOP/pages/posts.html";
       backLink.textContent = "Back to posts";
       commentsContainer.classList.add("comments-container");
       const commentsUl = document.createElement("ul");
       commentsUl.id = `comments-list-id`;
       
       postContainer.appendChild(commentsContainer);
       commentsContainer.appendChild(commentsUl);
       commentsContainer.appendChild(backLink);
   }
    
    
    function displayComments(x) {
        const commentsList = document.getElementById('comments-list-id');
        const commentElement = document.createElement("div");
        
        commentElement.classList.add("comment");
        const commentName = document.createElement("h3");
        commentName.classList.add("comment-name");
        commentName.textContent = x.name;
        
        const commentBody = document.createElement("p");
        commentBody.classList.add("comment-body");
        commentBody.textContent = x.body;
        
        const commentEmail = document.createElement("p");
        commentEmail.classList.add("comment-email");
        commentEmail.textContent = x.email;
        
        commentElement.appendChild(commentName);
        commentElement.appendChild(commentBody);
        commentElement.appendChild(commentEmail);
        
        commentsList.appendChild(commentElement);
    }
});