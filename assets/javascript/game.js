var words = ["inuyasha", "digimon", "pokemon", "medabots"];
var cPick = words[Math.floor(Math.random() * words.length)];
var wCondition = 0;
var letterGuessed = [];
var gLetters = document.getElementById("gLetters");
var guessR = document.getElementById("guessRem");
var lCondition = 12;
var wins = document.getElementById("wins");
var tLines = document.getElementById("lines");

function resetLines(){
    var lettersTag = document.getElementById("gWord");
    //var linesTag = document.getElementById("lines");
    lettersTag.textContent = "";
    //linesTag.textContent = "";
    for(var i = 0; i < cPick.length; i++){
        var letterSpan = document.createElement("span");
        var spaceSpan = document.createElement("span");
        letterSpan.setAttribute("class", "line line-" + cPick[i]);
        var letterText = document.createTextNode("");
        var spaceText = document.createTextNode("");
        letterSpan.appendChild(letterText);
        spaceSpan.appendChild(spaceText);
        lettersTag.appendChild(letterSpan);
        lettersTag.appendChild(spaceSpan);
    }
}

//print guessed letters
function prLetterGuessed(){
    var aletters = "";
    for(var i = 0; i < letterGuessed.length; i++){
        
        aletters = aletters + letterGuessed[i] + ", ";
    }
    gLetters.textContent = aletters;    
    console.log(letterGuessed.toString()) ;    
} 

function resetGame(){
    wCondition = 0;
    lCondition = 12;
    cPick = words[Math.floor(Math.random() * words.length)];
    resetLines();
    guessR.textContent = lCondition;
    letterGuessed.length = 0;
    prLetterGuessed();
}

resetGame();

document.onkeyup = function(event) {
    // if key is part of alphabet.
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        
        var userGuess = event.key;
        //If Guess is correct
        if(cPick.includes(userGuess)){
            var targetL = document.querySelectorAll(".line-" + userGuess);
            
            for(var p = 0; p < targetL.length; p++){
                targetL[p].textContent = userGuess;
                if(!letterGuessed.includes(userGuess)){
                    wCondition += 1;
                    //console.log(wCondition);
                }
            }
        }//if guess is incorrect
        else if(!letterGuessed.includes(userGuess)){
            lCondition -= 1;
            guessR.textContent = lCondition;
        }
        
        //Add letter guessed to array if not in there already
        if(!letterGuessed.includes(userGuess)){
            letterGuessed.push(userGuess);
        }

        prLetterGuessed();
        
        //if remaining guess reaches 0
        if(lCondition === 0){
            wins.textContent = 0;
            resetGame();
        }

        
        //determine win condition
        if(wCondition === cPick.length){
            wins.textContent = parseInt(wins.textContent) + 1;
            resetGame();
        }
    }
    
    
             
}
