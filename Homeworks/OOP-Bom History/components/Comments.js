/*global fetch*/
/*global Comment*/
class Comments {
    constructor() {
        this.url = "https://jsonplaceholder.typicode.com/comments?postId=";
        this.commentsArr = [];
    }
    
    handleErrors (response)  {
       if(response.ok) {
           return response.json();
       }
       throw new Error(response.status);
    };
    
    getComments(id) {
    return    fetch(`${this.url}${id}`, {method:"GET"})
        .then(this.handleErrors)
        .then((response) => {
            response.forEach((comment)=> {
             let c = new Comment(comment);
             if(this.commentsArr.length <5){
                 this.commentsArr.push(c)
             }else{
                 this.commentsArr = [];
                 this.commentsArr.push(c)
             }
         });
          //console.log(this.commentsArr);  
        })
        .catch(function(error) {
            console.log("Big error",error);
        });
    }
    
    
}