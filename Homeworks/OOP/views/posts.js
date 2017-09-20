/*global Posts*/
/*global pagination*/
/*global pagination1*/
/*global header*/

// get the page number from the URL
function getUrlParam(name){
  var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
  if (results==null){
    return "1";
  }else{
    return results[1] || 0;
  }
}

let pageNumber 
function getPageNumber() {
    pageNumber = getUrlParam("page");
    console.log(`page number:${pageNumber}`);
}

window.addEventListener("load", function() {
    getPageNumber();
    header();
    
    const posts = new Posts();
    const postRequest = posts.getPosts();
    
    //create a empty list for the posts 
    function createPostsContainer() {
        const htmlBody = document.getElementsByTagName('body')[0];
        const postsContainer = document.createElement('div');
        const postList = document.createElement('ul');
        postsContainer.id = "posts-container";
        postsContainer.classList.add("container-fluid","col-md-8");
        postList.id = "list-id";
        htmlBody.appendChild(postsContainer);
        postsContainer.appendChild(postList);
    }
    createPostsContainer();
    
    // this function slices the general posts arr based on page number and items per page
    function slice(itemsPerPage,pageNumber,list) {
        let start = (pageNumber - 1)*itemsPerPage;
	    let end = (itemsPerPage * pageNumber);
        return list.slice(start, end);
    }
    
    function pagination(pagesArr,lastPage) {
        const url = "https://preview.c9users.io/voju/scoala_informala_voju/Homeworks/OOP/pages/posts.html?_c9_id=livepreview0&_c9_host=https://ide.c9.io#";
        // pagesArr = pagesArr;
        
        const postContainer = document.getElementById("posts-container");
        const nav = document.createElement("nav");
        nav.id = "navigationBar";
        nav.classList.add("col-md-8");
        const ul = document.createElement("ul");
        ul.classList.add("pagination");
        
        const previousBtn = document.createElement("li");
        if(pageNumber === "1") {
            previousBtn.classList.add("page-item", "disabled");
        }else{
            previousBtn.classList.add("page-item");
        }
        
        const previousBtnLink = document.createElement("a");
        previousBtnLink.classList.add("page-link");
        if(pageNumber == "1") {
            previousBtnLink.href = "#";
        } else {
            previousBtnLink.href = `${url}?page=${Number(pageNumber)-1}`;
        }
        //previousBtnLink.setAttribute("tabindex", "-1");
        previousBtnLink.textContent = "Previous";
        previousBtn.addEventListener("click",() => {
            getPageNumber();
            window.location.reload(true);
        });
        
        function createPageNumber(pageNumber,pageNum) {
            const li = document.createElement("li");
            li.classList.add("page-item");
            if(pageNum == pageNumber) {
                li.classList.add("active");
            }
            const a = document.createElement("a");
            a.classList.add("page-link");
            a.href = `${url}?page=${pageNumber}`;
            a.textContent = `${pageNumber.toString()}`;
            li.appendChild(a);
            li.addEventListener("click",() => {
            getPageNumber();
            window.location.reload(true);
            });
            
            ul.appendChild(li);
        }
        
        
        const nextBnt = document.createElement("li");
        if(pageNumber == lastPage) {
            nextBnt.classList.add("page-item", "disabled");
        } else {
            nextBnt.classList.add("page-item");
        }
        const nextBtnLink = document.createElement("a");
        nextBtnLink.classList.add("page-link");
        nextBtnLink.textContent = "Next";
        nextBtnLink.href = `${url}?page=${Number(pageNumber)+1}`;
        nextBnt.appendChild(nextBtnLink);
        
        nextBnt.addEventListener("click",() => {
            getPageNumber();
            window.location.reload(true);
        });
        
        previousBtn.appendChild(previousBtnLink);
        
        ul.appendChild(previousBtn);
        pagesArr.forEach((pageNum) => {
            createPageNumber(pageNum,pageNumber);
        })
        ul.appendChild(nextBnt);
        nav.appendChild(ul);
        postContainer.appendChild(nav);
        
    }
    function updatePosts() {
        postRequest.then(() => {
        
            let postsPagination = slice(5,pageNumber,posts.postsList);
            let lastPage = (posts.postsList.length) / 5;
            //console.log(lastPage);
            //console.log(page);
            let paginationArr = pagination1(pageNumber,lastPage);
            console.log(paginationArr);
            
            postsPagination.forEach((post) => {
                displayPosts(post);
            });
            pagination(paginationArr,lastPage);
        });
    }
    
    updatePosts();
    
    function postClicked(event) {
        let id = event.path[1].id;
        window.location.href = `https://preview.c9users.io/voju/scoala_informala_voju/Homeworks/OOP/pages/post.html?id=${id}`;
}
    
    //display posts in the ul
    function displayPosts(post) {
        const postList = document.getElementById("list-id");
        const postElement = document.createElement("article");
        const postTitle = document.createElement("h2");
        
        postTitle.textContent = post.title;
        const postBody = document.createElement("p");
        const textContent = `${post.body.slice(0,50)}...`;
        postBody.textContent = textContent;
        
        postElement.id = post.id;
        postElement.classList.add("article-post");
       
        postElement.addEventListener("click",postClicked)
        
        postElement.appendChild(postTitle);
        postElement.appendChild(postBody);
        
        postList.appendChild(postElement);
    }
    

})
