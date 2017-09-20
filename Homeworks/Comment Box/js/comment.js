window.addEventListener("load", function(e){
    var comments =[
        {id: "comment-1", 
         text: "This is a really cool place to be!", 
         email: "john.doe@gmail.com", 
         img: "https://media4.s-nbcnews.com/j/newscms/2016_04/1396246/donald-trump-mug_5fea106e0eb494469a75e60d8f2b18ea.nbcnews-fp-320-320.jpeg"},
        
        {id: "comment-2", 
         text: "I agree we should be there!", 
         email: "marry.anne@gmail.com", 
         img: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT_4hXwuiFBBoORtirhEU0JQ9YviYZUAFZ9qk1u47BC7K7b_C5H"},
        
        {id: "comment-3", 
         text: "Personally I didn't like it! Bleah", 
         email: "kevin.martin@gmail.com", 
         img: "https://media1.s-nbcnews.com/j/newscms/2015_51/1343771/151217-world-putin-thumbsup-830a-jpg-0821_1d57fca6108ce0b94f7687fc2793f635.nbcnews-ux-2880-1000.jpg"}
    ];
    NodeList.prototype.addEventListener = function(event, func) {
            this.forEach(function(content, item) {
                content.addEventListener(event, func);
            });
        }
    
    //get the comments UL
    var commentsList = document.querySelector(".commentList"); 
    
    //map ower the comments arr and display each comment obj inside an li element
    function displayComments() {
        removeLiElements();
            
        comments.map(function(comment){
            
            var liElement = document.createElement("li");
            liElement.setAttribute("id",comment.id);
            commentsList.appendChild(liElement);

            var closeButton = document.createElement("button");
            closeButton.classList.add("js-delete-comm-btn","close");
            closeButton.setAttribute("value", comment.id);
            closeButton.textContent = "x";
            liElement.appendChild(closeButton);

            var imageDiv = document.createElement("div");
            imageDiv.classList.add("commenterImage");
            liElement.appendChild(imageDiv);

            var image = document.createElement("img");
            image.setAttribute("src", comment.img);
            imageDiv.appendChild(image);

            var commentDiv = document.createElement("div");
            commentDiv.classList.add("commentText");
            liElement.appendChild(commentDiv);
            var commentP = document.createElement("p");
            commentP.textContent = comment.text;
            commentDiv.appendChild(commentP);

            var email = document.createElement("span");
            email.classList.add("date", "sub-text");
            email.textContent = comment.email;
            commentDiv.appendChild(email);

        });
        removeComment();
    }   
    
    displayComments();
    
    //add event listener on X
        
    function removeComment () {
        var xButtonList = document.querySelectorAll(".js-delete-comm-btn");
        
        xButtonList.addEventListener("click", function(e) {
        var commentId = e.target.value;
            
        var newCommentArr = comments.filter(function(obj) {
             return obj.id != commentId;
          });
        comments = newCommentArr;
        displayComments();    
       });
    }   
        
    
    // function that constructs new comment objects    
    function Comment(id, text, email,img ){
        this.id = id;
        this.text = text;
        this.email = email;
        this.img = img;
    }
    
    
     
    //select the comment input
     var newCommentInput = document.querySelector(".js-comm-text");
    
    //add event listener on Add Button
     var addBtn = document.querySelector(".js-add-comment");
            addBtn.addEventListener("click", function(e){
            e.preventDefault();
            
            var textContent = newCommentInput.value || "random text";
            var id = Date.now();
            var email = "kevin.martin@gmail.com";
            var image = "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT_4hXwuiFBBoORtirhEU0JQ9YviYZUAFZ9qk1u47BC7K7b_C5H"
            
            
            //create a new comment object and push it into the comments array
            var newComment = new Comment(id, textContent, email, image);
            comments.push(newComment);  
            
            //set comment imput value to empty string
            newCommentInput.value = ""
                
            //disply the new comments    
            displayComments();
               
            
        });
     
        //declare empty ul elem function
        function removeLiElements(){
                document.querySelector(".commentList").textContent = ""
        }
       
        
});

