/*global Post*/
/*global Comments*/


function getUrlParam(name){
  var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
  if (results==null){
    return null;
  }else{
    return results[1] || 0;
  }
}


let id = getUrlParam("id");
window.addEventListener("load",function() {
        
    const post = new Post();
    const getPost = post.getPost(id);
    console.log(post);
    
    createPostContainer();
    
    getPost.then(() => {displayPost(post)});
    
    
    function createPostContainer() {
        const htmlBody = document.getElementsByTagName('body')[0];
        const mainPostContainer = document.createElement('div');
        mainPostContainer.classList.add("container");
        htmlBody.appendChild(mainPostContainer);
        
        const postContainer = document.createElement("div");
        postContainer.classList.add("col-sm-8", "blog-main");
        postContainer.id = `post-id`;
        mainPostContainer.appendChild(postContainer);
        
        const blogPost = document.createElement("div");
        blogPost.id = "js-blog-post";
        blogPost.classList.add("blog-post");
        postContainer.appendChild(blogPost);
        
    }
    
    
    function displayPost(post) {
      const blogPost = document.getElementById("js-blog-post");
      const blogPostTitle = document.createElement("h2");
      blogPostTitle.classList.add("blog-post-title");
      blogPostTitle.textContent = post.title;
      blogPost.appendChild(blogPostTitle);
      
      const postBody = document.createElement("p");
      postBody.textContent = post.body;
      blogPost.appendChild(postBody);
      
    }
        
});







