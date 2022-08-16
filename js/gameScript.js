"use strict"

const gameTime= document.querySelector(".game-time");
const gameRounds=document.querySelector(".game-rounds-number");
const gameSettingButton= document.querySelector(".game-setting-button");
const gameSettings = document.querySelector(".game-settings");
const roundResult =document.querySelector(".round-result-container");
const gameResult = document.querySelector(".game-result-container")


const startGame =function(){
    if (gameTime.value && gameRounds.value) {
        const gRounds=Number(gameRounds.value.replace("Rounds","").replace("Round",""));
        const gTime= Number(gameTime.value.replace("min",""));
        const g = new Game(gRounds,gTime); 
        g.addEventListenersToBoaed();
        gameSettings.classList.toggle("hidden")  
    
        roundResult.addEventListener("click",(elm)=>{

            if (elm.target.className=="submit-btn") {
               console.log(roundResult.classList.toggle("hidden"));; 
               console.log(g.rounds);
               if (g.rounds>1) {
                g.startNewRound() 
               }
               else {
                console.log('The Game ended');
                 
               }
            } 
        })
    }
    gameResult.addEventListener("click",(event)=>{
        if (event.target.className=="submit-btn") {
            location.reload();
        }
    })
    
}

gameSettingButton.addEventListener("click",startGame)




