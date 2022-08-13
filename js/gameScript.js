"use strict"

const gameTime= document.querySelector(".game-time");
const gameRounds=document.querySelector(".game-rounds-number");
const gameSettingButton= document.querySelector(".game-setting-button");
const gameSettings = document.querySelector(".game-settings");

gameSettingButton.addEventListener("click",()=>{
    console.log(Number(gameTime.value.replace("min",""))) ;
    console.log(Number(gameRounds.value.replace("Round","")));
    if (gameTime.value && gameRounds.value) {
        console.log("ddd"); 
        const g = new Game(
                            Number(gameRounds.value.replace("Round","")),
                            Number(gameTime.value.replace("min",""))
                            )
        g.addEventListenersToBoaed();
        gameSettings.classList.toggle("hidden")  
    }
})