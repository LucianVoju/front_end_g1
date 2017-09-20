window.addEventListener("load", function(e){

    var conformationBanner = document.getElementById("confirmation-banner");
    var firstName, lastName, gender, textArea;
    
    var submitButton = document.getElementById("submit-button");
    
    document.getElementById("close").addEventListener("click", function(){
        conformationBanner.style.visibility = "hidden"
        firstName = "";
        lastName = "";
        textArea = "";
        
        document.getElementById("first-name").value = "";
        document.getElementById("last-name").value = "";
        document.getElementById("text-area").value = "";
        document.getElementById("gender-male").checked = "checked";
        document.getElementById("image-submit").value ="";
        });
    
    submitButton.addEventListener("click", function() {
        var newFirstName = document.getElementById("first-name").value;
        var newLastName = document.getElementById("last-name").value;
        var newGender = document.querySelector('input[name="gender"]:checked').value;
        var newTextArea = document.getElementById("text-area").value;
        var imageUrl = document.getElementById("image-submit").value;
        
        
        
        if (newFirstName.length === 0) {
            document.getElementById("first-name").parentNode.classList.add("validation-fail");
        } 
        
        if (newLastName === ""){
            document.getElementById("last-name").parentNode.classList.add("validation-fail");
        } 
        
        if(newTextArea.length === 0) {
            document.getElementById("text-area").parentNode.classList.add("validation-fail");
        } 
        
        if(newFirstName.length !== 0){
            document.getElementById("first-name").parentNode.classList.remove("validation-fail");
            firstName = newFirstName;
        }
    
        
        if(newLastName.length !== 0){
            document.getElementById("last-name").parentNode.classList.remove("validation-fail");
            lastName = newLastName;
        }
    
        if(newTextArea.length !== 0){
            document.getElementById("text-area").parentNode.classList.remove("validation-fail");
            textArea = newTextArea;
        }
       
        
        if(newFirstName.length !==0 && newLastName.length !== 0 && newTextArea.length !== 0) {
            document.getElementById("js-lastname-banner").textContent = lastName
            conformationBanner.style.visibility = "visible";
            
            document.getElementById("first-name-display").textContent = firstName;
            document.getElementById("last-name-display").textContent = lastName;
            document.getElementById("gender-display").textContent = newGender;
            document.getElementById("message-display").textContent = textArea;
            document.getElementById("user-image").setAttribute("src", imageUrl);
            
            console.log(`First name: ${firstName}`);
            console.log(`Last name: ${lastName}`);
            console.log(`Gender: ${newGender}`)
            console.log(`Message: ${newTextArea}`)   
        }
        
    });
});