/*global fetch*/

//create a class thats gets all the posts
class Posts {
    constructor() {
        this.postsList=[];
        this.url = 'https://jsonplaceholder.typicode.com/posts';
    }
    
    
    handleErrors (response)  {
           if(response.ok) {
               return response.json();
           }
           throw new Error(response.status);
        };
    //get all posts function
    getPosts() {
        return fetch(this.url, {method:"GET"})
        .then(this.handleErrors)
        .then((response) => {
            response.forEach((post) => {
                this.postsList.push(post)
            })
           //console.log(this.postsList);
            
        })
        .catch(function(error) {
            console.log("Big error",error);
        });
    }
    
     
}