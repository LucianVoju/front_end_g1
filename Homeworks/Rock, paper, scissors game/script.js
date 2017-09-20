function play(){
    var possibilities = ["rock", "paper","scissors"];
    function random (min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    var userChoice = possibilities[random(0,2)];
    var computerChoice = possibilities[random(0,2)];
    var cpu = "Computer choice:";
    var user = "User choice:";
    console.log(userChoice, computerChoice);
    
    if (userChoice === computerChoice) {
        console.log(`${user} ${userChoice}, ${cpu} ${computerChoice}! Draw game!`);   
    }else if (userChoice === "rock") {
        if(computerChoice === "paper"){
            console.log(`${user} ${userChoice}, ${cpu} ${computerChoice}! Computer wins!`);
        }else {
            console.log(`${user} ${userChoice}, ${cpu} ${computerChoice}! User wins!`);
            
        }
    }else if(userChoice === "paper") {
        if(computerChoice === "scissors") {
            console.log(`${user} ${userChoice}, ${cpu} ${computerChoice}! Computer wins!`);
        }else{
             console.log(`${user} ${userChoice}, ${cpu} ${computerChoice}! User wins!`);
        }
    }else if (userChoice === "scissors"){
        if(computerChoice === "paper") {
             console.log(`${user} ${userChoice}, ${cpu} ${computerChoice}! User wins!`);
        }
    }   else{
         console.log(`${user} ${userChoice}, ${cpu} ${computerChoice}! Computer wins!`);
    }
}


 play();