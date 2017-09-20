 function bmi() {
    var name = document.getElementById("name").value;
    var heigth = document.getElementById("heigth").value;
    var weigth = document.getElementById("weigth").value;
    var bmi = weigth/(heigth * heigth);
    var resultMessage;
   
    
    if(bmi < 18.5) {
      resultMessage = "underweight";
    } else if (bmi >=18.5 && bmi < 25){
        resultMessage ="normal";
    } else if (bmi >= 25 && bmi < 30) {
        resultMessage = "overweight";
    }else{
        resultMessage= "obese";
    }
    
     function printMessage (){
        var nameInput = document.getElementById("userName").textContent;
        document.getElementById("userName").textContent = name;
        
        var bmiResultText = document.getElementById("bmi-result").textContent;
        document.getElementById("bmi-result").textContent = resultMessage;
        
        document.getElementById("answer").style.visibility = "visible";
    }
    
    printMessage();
}

function resetH2(){
    document.getElementById("answer").style.visibility = "hidden";
}