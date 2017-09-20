/*global Posts*/
/*global Post*/
/*global Comments*/
/*global createPagination*/
/*global createPosts*/



window.addEventListener("load", function() {
    
    //create new posta object
    const posts = new Posts();
    
    //create new post obj
    const postObj = new Post();
    //create new comments obj
    const commentsObj = new Comments();
    
    //get array with all posts
    const postRequest = posts.getPosts();

    //create a empty posts list
    createPosts.createEmptyPostsList();

    //listen for the back button press
    window.onpopstate = function(event) {
      let previous = event.state.pageNumber;
      console.log(previous);
      const postsDiv = document.getElementById("posts-container");
      postsDiv.remove();
      createPosts.createEmptyPostsList();
      posts.pageNumber = Number(previous);
      displayPost();
    };
    
    //display the posts and apgination 
    function displayPost() {
        const url =`https://preview.c9users.io/voju/scoala_informala_voju/Homeworks/OOP-Bom%20History/pages/posts.html?_c9_id=livepreview2&_c9_host=https://ide.c9.io`
        window.history.pushState({pageNumber:`${posts.pageNumber}`}, "", `${url}?page=${posts.pageNumber}`);
        
        //get the array with all the posts objects
        postRequest.then(() => {
            //cut the posts array based on the items per page and page number
            const slicedPostsArray = posts.slice(posts.itemsPerPage,posts.pageNumber,posts.postsList);
            //determinate the last page
            const lastPage = (posts.postsList.length) / 5;
            //get the pagination range
            const paginationArr = createPagination.paginationRange(posts.pageNumber,lastPage);
            //display posts based on the sliced array
            slicedPostsArray.forEach((post) => {
                createPosts.createHtmlforPost(post,postObj,commentsObj);
                //console.log(post);
                
            });
            //display pagination
            createPagination.init(paginationArr,lastPage,posts.pageNumber,posts,displayPost);
        });
        
    }
    
    
    displayPost(posts.pageNumber);
    
});



