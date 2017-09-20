/*global fetch*/
/*global $*/
/*global axios*/
$(document).ready(function() {
    var rootUrl = 'https://jsonplaceholder.typicode.com';
    
       fetch(
        `${rootUrl}/posts`,{
            method: "GET"
            }
        )
     .then(handleErrors)
     .then(displayContentOnPage)
     .then(function(param) {
         //console.log("aici este hello: ", param);
     })
     .catch(function(error) {
        console.log("Big error",error);
     });
   
        
    function handleErrors(response) {
           if(response.ok) {
               return response.json();
           }
           throw new Error(response.status);
        }

    function displayError(element,error){
        var articlediv = element.querySelector(".article-comments");
        articlediv.innerHTML = error;
    }
     
    function createNewArticleinMemory(jsonResponse) {
        var template = document.getElementById("template");
        var articleDiv = template.cloneNode(true);
        articleDiv.id = "";
     
        var articleNumber = articleDiv.querySelector(".article-id");
        articleNumber.textContent = jsonResponse.id;
        
        var articleTitle = articleDiv.querySelector(".article-title");
        articleTitle.textContent = jsonResponse.title;
        
        var articleBody = articleDiv.querySelector(".article-body");
        articleBody.textContent = jsonResponse.body;
        
        var editBtn = articleDiv.querySelector(".article-edit");
        editBtn.id = jsonResponse.id;
        editBtn.addEventListener("click", updateArticle);
        
        var deleteBtn = articleDiv.querySelector(".article-delete");
        deleteBtn.id = jsonResponse.id;
        deleteBtn.addEventListener("click", function(event) {
           console.log(event);
           deleteArticle(event);
        });
        
        
        
        return articleDiv;
     }
    
    function displayContentOnPage(jsonResponse) {
       var paragraphContainer = document.getElementById("articles");
       
       for(var i = 0; i < 5; i++) {
           var theNewArticle = createNewArticleinMemory(jsonResponse[i]);
           paragraphContainer.appendChild(theNewArticle);
          if(i === 1) {
              jsonResponse[i].id = "///error";
          }
           getArticleComments(theNewArticle, jsonResponse[i].id);
       }
       
       
       var template = document.getElementById("template");
       template.classList.add("hide");
      return "hello";
    }
    
    function deleteArticle(event) {
        var articleId = event.target.id;
        var url = `${rootUrl}/posts/${articleId}`;
        
        
        
        fetch(url,{method:"DELETE"})
        .then(handleErrors())
        .then(function(jsonResponse){
            //console.log(jsonResponse);
            var deletedElement = event.target.parentElement.parentElement;
            deletedElement.remove();
        })
        .catch(function(error){
            console.log("delete error", error);
        });
    }
    
    function updateArticle(event) {
        var articleId = event.target.id;
        var url = `${rootUrl}/posts/${articleId}`;
        console.log(articleId);
        axios.patch(url,{
            data: {
                body: "foo"
            }
        })
        .then(function(response) {
            var bodyElement = event.target.parentElement.parentElement.querySelector('.article-body');
            bodyElement.innerHTML = response.data.data.body;
            console.log(response);
        })
    }
    
    function getArticleComments(element, id) {
        var url = `${rootUrl}/posts/${id}/comments`;
     
        fetch(url,{method:"GET"})
            .then(handleErrors)
            .then(function (response) {
                var articleComments = element.querySelector(".article-comments");
                response.forEach(function(comment) {
                    articleComments.innerHTML += comment.email;
                })
            })
            .catch(function(error) {
                console.log("got it",error);
                displayError(element,error);
            });
    }       
});

 
