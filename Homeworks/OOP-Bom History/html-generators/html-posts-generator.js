//this function creates the html for the posts items
/*global createPost*/
const createPosts = (function createPosts() {
    
    function updateUrl(id) {
        const url = window.location.href;
        window.history.replaceState({}, "", `${url}&post${id}`);
    }
    
    
   
    const posts = {
        //create and display post
        createHtmlforPost: function createHtmlforPost(post,postObj,commentsObj) {
            
            const postList = document.getElementById("posts-list");
            const postElement = document.createElement("article");
            const postTitle = document.createElement("h2");
            const textContent = `${post.body.slice(0,50)}...`;
            postTitle.textContent = post.title;
            const postBody = document.createElement("p");
            postBody.textContent = textContent;
            postElement.id = post.id;
            postElement.classList.add("article-post");
            postElement.appendChild(postTitle);
            postElement.appendChild(postBody);
            postList.appendChild(postElement);
            
            postElement.addEventListener("click",()=>{
               updateUrl(post.id);
               
               const clickedPost = postObj.getPost(post.id);
               const commentsForPost = commentsObj.getComments(post.id);
               clickedPost
               .then(() => {
                   console.log(postObj);
                   commentsForPost.then(() =>{
                       console.log(commentsObj.commentsArr);
                   });
               })
               
            });
        },
        //create a empty html list
        createEmptyPostsList:function createEmptyPostsList() {
            const body = document.getElementsByTagName("body")[0];
            const postsContainer = document.createElement("div");
            postsContainer.id="posts-container";
            postsContainer.classList.add("col-md-8");
            body.appendChild(postsContainer);
            const postList = document.createElement('ul');
            
            postList.id = "posts-list";
            postsContainer.appendChild(postList);
        }
    };
    return posts;
})();



