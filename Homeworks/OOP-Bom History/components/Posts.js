/*global fetch*/

//create a class thats gets all the posts
class Posts {
    constructor() {
        this.postsList=[];
        this.url = 'https://jsonplaceholder.typicode.com/posts';
        this.pageNumber = 1;
        this.itemsPerPage = 5;
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
            response.forEach(post => {
                this.postsList.push(post)
            });
        })
        .catch(function(error) {
            console.log("Big error",error);
        });
    }
    
    //a function that cuts the posts array at the desired location based on the page number and items per page
     slice(itemsPerPage,pageNumber,list) {
        let start = (pageNumber - 1)*itemsPerPage;
	    let end = (itemsPerPage * pageNumber);
        return list.slice(start, end);
    }
    
    
}