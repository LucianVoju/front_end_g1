//create pagination
const createPagination = (function() {
    //create the html for pagination
    const pagination = {
        init: function (pagesArr,lastPage,pageNumber,posts,displayPost) {
        const url = "https://preview.c9users.io/voju/scoala_informala_voju/Homeworks/OOP-Bom%20History/pages/posts.html?_c9_id=livepreview2&_c9_host=https://ide.c9.io";
        console.log(pageNumber);
        
        //create the html nav element
        const postContainer = document.getElementById("posts-container");
        const nav = document.createElement("nav");
        nav.id = "navigationBar";
        nav.classList.add("col-md-8");
        const ul = document.createElement("ul");
        ul.classList.add("pagination");
        
        //create the html previous button
        const previousBtn = document.createElement("li");
        if(pageNumber === 1) {
            previousBtn.classList.add("page-item", "disabled");
        }else{
            previousBtn.classList.add("page-item");
        }
        const previousBtnLink = document.createElement("a");
        previousBtnLink.classList.add("page-link");
        previousBtnLink.textContent = "Previous";
        
        //ad the click event on the previous button
        previousBtn.addEventListener("click",(e) => {
                e.preventDefault();
                if (pageNumber === 1){
                    const postList = document.getElementById("posts-list");
                    while (postList.firstChild) {
                    postList.removeChild(postList.firstChild);
                    }
                    const nav = document.getElementById("navigationBar");
                    nav.remove();
                    displayPost(posts.pageNumber);
                }else{
                    posts.pageNumber = posts.pageNumber -1;
                    const postList = document.getElementById("posts-list");
                    while (postList.firstChild) {
                    postList.removeChild(postList.firstChild);
                    }
                    const nav = document.getElementById("navigationBar");
                    nav.remove();
                    
                    displayPost();
                }
            });
            
            
        //create the html next button    
        const nextBnt = document.createElement("li");
        if(pageNumber == lastPage) {
            nextBnt.classList.add("page-item", "disabled");
        } else {
            nextBnt.classList.add("page-item");
        }
        const nextBtnLink = document.createElement("a");
        nextBtnLink.classList.add("page-link");
        nextBtnLink.textContent = "Next";
        nextBnt.appendChild(nextBtnLink);
        
        //ad the click event on the next button
        nextBnt.addEventListener("click",(e) => {
            e.preventDefault();
            if (pageNumber === lastPage){
                const postList = document.getElementById("posts-list");
                while (postList.firstChild) {
                postList.removeChild(postList.firstChild);
                }
                const nav = document.getElementById("navigationBar");
                nav.remove();
                displayPost(posts.pageNumber);
            }else{
                posts.pageNumber = posts.pageNumber +1;
                const postList = document.getElementById("posts-list");
                while (postList.firstChild) {
                postList.removeChild(postList.firstChild);
                }
                const nav = document.getElementById("navigationBar");
                nav.remove();
                
                displayPost();
            }
        });
        
        //create the html for the pagination numbers
         function createPageNumber(pageNum,pageNumber,ul,posts,displayPost) {
                const li = document.createElement("li");
                li.classList.add("page-item");
                const a = document.createElement("a");
                a.classList.add("page-link");
                if(pageNum == pageNumber){
                    li.classList.add("active");
                }
                a.textContent = `${pageNum.toString()}`;
                li.appendChild(a);
                
                //ad the click event on the pagination numbers
                li.addEventListener("click",(e) => {
                e.preventDefault();
                posts.pageNumber = pageNum;
                const postList = document.getElementById("posts-list");
                while (postList.firstChild) {
                postList.removeChild(postList.firstChild);
                }
                const nav = document.getElementById("navigationBar");
                nav.remove();
                displayPost(posts.pageNumber);  
            });
            
            ul.appendChild(li);
        }
        
        
        previousBtn.appendChild(previousBtnLink);
        ul.appendChild(previousBtn);
        
        pagesArr.forEach((num) => {
            createPageNumber(num,pageNumber,ul,posts,displayPost);
        });
        
        ul.appendChild(nextBnt);
        nav.appendChild(ul);
        postContainer.appendChild(nav);
    
        },
        //determinate the pagination range based on the current page and the last page
        paginationRange:function (pageNum, lastPage) {
            const currentPage = Number(pageNum),
            last = lastPage,
            delta = 2,
            left = currentPage - delta,
            right = currentPage + delta,
            range = [];
            for (let i = 1; i <= last; i++) {
            if ( i >= left && i <= right) {
                range.push(i);
                    }
                }
                return range;
            },
            
           
        
            
    };
    
    return pagination;
})();