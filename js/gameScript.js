"use strict"

const gameTime= document.querySelector(".game-time");
const gameRounds=document.querySelector(".game-rounds-number");
const gameSettingButton= document.querySelector(".game-setting-button");
const gameSettings = document.querySelector(".game-settings");
const gameResult =document.querySelector(".game-result-container");

gameSettingButton.addEventListener("click",()=>{
    console.log(Number(gameTime.value.replace("min",""))) ;
    console.log(Number(gameRounds.value.replace("Round","")));
    if (gameTime.value && gameRounds.value) {
        console.log("ddd");
        console.log(Number(gameRounds.value.replace("Round",""))); 
        console.log(Number(gameTime.value.replace("min","")));
        const g = new Game(
                            Number(gameRounds.value.replace("Round","")),
                            Number(gameTime.value.replace("min",""))
                            )
        g.addEventListenersToBoaed();
        gameSettings.classList.toggle("hidden")  
    
        gameResult.addEventListener("click",(elm)=>{

            if (elm.target.className=="submit-btn") {
               gameResult.classList.toggle("hidden"); 
               g.startNewRound()
            }
            console.log(elm.target.className);
        })
    }
})


//"submit-btn"



