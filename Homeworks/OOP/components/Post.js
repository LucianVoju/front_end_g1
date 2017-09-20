/*global fetch*/

//create class for a single post
class Post{
    constructor() {
    this.url = 'https://jsonplaceholder.typicode.com/posts/';
    }
    
    handleErrors (response)  {
           if(response.ok) {
               return response.json();
           }
           throw new Error(response.status);
        };
        
    getPost(id) {
        return fetch(`${this.url}${id}`, {method:"GET"})
        .then(this.handleErrors)
        .then((response) => {
            this.userId = response.userId;
            this.id = response.id;
            this.title = response.title;
            this.body = response.body;
        })
        .catch(function(error) {
            console.log("Big error",error);
        });
    }
    
    
}