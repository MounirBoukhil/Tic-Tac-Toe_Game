"use strict"

const gameTime= document.querySelector(".game-time");
const gameRounds=document.querySelector(".game-rounds-number");
const gameSettingButton= document.querySelector(".game-setting-button");
const gameSettings = document.querySelector(".game-settings");
const roundResult =document.querySelector(".round-result-container");
const gameResult = document.querySelector(".game-result-container");
document.activeElement.blur();

const startGame =function(){
/* 
    This function will start the game by taking the first user 
    inputs and create game object from game class.
*/
    if (gameTime.value && gameRounds.value) {
        const gRounds=Number(gameRounds.value.replace("Rounds","").replace("Round",""));
        const gTime= Number(gameTime.value.replace("min",""));
        const gameObject = new Game(gRounds,gTime);
        gameSettings.classList.toggle("hidden");
        roundResult.addEventListener("click",(elm)=>{

            if (elm.target.className=="submit-btn") {
                roundResult.classList.toggle("hidden");
                gameObject.startNewRound() 
            } 
        })
    }
    gameResult.addEventListener("click",(event)=>{
        if (event.target.className=="submit-btn") {
            location.reload();
        }
    })
    
}
gameSettingButton.addEventListener("click",startGame);




