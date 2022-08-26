"use strict"

/*  Classes */
class Player{
    /*
        This is class contain player attribute and methods
    */
    constructor(id,time,symbol){
        this.id=id;
        this.time=time*60;
        this.numberOfWins=0;
        this.numberOfLosses=0;
        this.numberOfDraws=0;
        this.symbol=symbol;
        this.active=false
    }
    addWin(){
    /* 
        This Method will add a win to this.numberOfWins property.
    */
        const playerWinnInterface=document.querySelector(`.player${this.id}-wins`);
        this.numberOfWins+=1;
        playerWinnInterface.innerHTML=`Wins = ${this.numberOfWins}`;
    }
    addLosse(){
    /* 
        This Method will add a loss to this.numberOfLosses property.
    */
        const playerLossesInterface=document.querySelector(`.player${this.id}-losses`);
        this.numberOfLosses+=1;
        playerLossesInterface.innerHTML=`Losses = ${this.numberOfLosses}`;
    }
    addDraws(){
    /* 
        This Method will add a draw to this.numberOfDraws property.
    */
        const playerDrawsInterface=document.querySelector(`.player${this.id}-draws`);
        this.numberOfDraws+=1;
        playerDrawsInterface.innerHTML=`Draws = ${this.numberOfDraws}`;
    }
}

class Board{
    /*
        This class contains game board methods and attributes.
    */
    constructor(){
        this.boxes = this.#createMatrix(document.querySelectorAll(".box"))
    }
    createBoard(){
    /*
        This method will put "-"" character of each box of the board.
    */
        this.boxes.forEach(line=>{
            line.forEach(box=>{
                box.innerHTML="-";})
        })
    }
    addMove(lineIndex,rowIndex,character){
    /*
        This method will add a character to the board by taking row index 
        and line index.
    */
        this.boxes[lineIndex][rowIndex].innerHTML=character
    }
    #createMatrix(list){
    /*
        This private method will put each box of the board in new matrix.
    */
        let matrix=[[new Array()],[new Array()],[new Array()]]
        let i=0;
        let j=0;
        list.forEach(elm=>{
            matrix[j][i]=elm;
            if (i<2) {
                i++
            }else{
                i=0;
                j++
            }    
        })
        return matrix;
    }
    addEventListenersToBoaed(game){
    /*
        This function will add event listener to boxes of the board and handel 
        the clicks.
    */ 
        let playerMoverResult=false
        game.board.boxes.forEach((line)=>{
            line.forEach((box)=>{
                box.addEventListener("click",()=>{
                if (game.turn==1) {
                    playerMoverResult=game.addPlayerMove(game.players.player1,box.id);
                    if(playerMoverResult){
                        game.turn=2; 
                        game.player1Timer.stopTurn();
                        if (playerMoverResult!="Round ended") {
                            game.player2Timer.startTurn(); 
                        }
                        playerMoverResult=false;
                    }
                }else{
                    if (game.turn==2) {
                        playerMoverResult=game.addPlayerMove(game.players.player2,box.id);
                        if(playerMoverResult){
                            game.turn=1;  
                            game.player2Timer.stopTurn();
                            if (playerMoverResult!="Round ended") {
                                game.player1Timer.startTurn();
                            }
                            playerMoverResult=false;
                        }
                    }
                }
                })
            })
        })
    }
}

class Timer{
    /* 
        This class controls players timer 
    */
    constructor(gameObject,playerObject){
        this.playerObject=playerObject;
        this.gameObject=gameObject;
        this.setTime();

    }
    setTime(){
    /* 
        This method will set time for each player by taking it from player object. 
    */
        this.stopTurn(this.playerObject);
        const timerContainer = document.querySelector(`.player${this.playerObject.id}-timer`);
        timerContainer.innerHTML=`${this.playerObject.time/60}:00`
        timerContainer.setAttribute("time", `${this.playerObject.time}`);
    }
    startTurn(){
    /* 
        This method will show countdown. 
    */ 
        this.playerObject.active=true;
        this.#startTimer();
    }
    #startTimer(){
    /* 
        This method will start player timer 
    */    
        const timerContainer = document.querySelector(`.player${this.playerObject.id}-timer`);
        const timerDiv1 = document.querySelector(`.player1-timer-container`);
        const timerDiv2 = document.querySelector(`.player2-timer-container`);
        let seconds=Number(timerContainer.getAttribute("time"));
        let minutes =0; 
        function conter(game,playerObject){
            if (seconds>=0) {
                minutes = Math.floor(seconds/60);
                let s=seconds%60;
                timerContainer.innerHTML=`${minutes}:${s < 10 ? '0' + s :s}`;
                if (playerObject.id==1) {
                    timerDiv1.classList.add("timer-active");
                    timerDiv2.classList.remove("timer-active");
                }else{
                    timerDiv2.classList.add("timer-active");
                    timerDiv1.classList.remove("timer-active");
                }
                timerContainer.setAttribute("time", `${seconds}`);
                seconds--;
            }else{
                let otherPlayerID = playerObject.id==1 ? 2 :1
                if (otherPlayerID==1) {
                    game.players.player1.addWin();
                    game.players.player2.addLosse();
                }
                else{
                    game.players.player2.addWin();
                    game.players.player1.addLosse();
                }
                if (game.rounds-1>0) {
                    game.showResult(otherPlayerID);
                }else{
                    game.showGameResult();
                }
                clearInterval(playerObject.active);
            }
            
        }
        this.playerObject.active=setInterval(conter,800,this.gameObject,this.playerObject);
    }
    stopTurn(){
    /* 
        This method will stop player timer 
    */ 
        if (this.playerObject.active) { 
            clearInterval(this.playerObject.active);
            this.playerObject.active=false;
        }
    }
}

class Game{
    /*
        This is main game class contain players objects and board object
        and other game attributes.
    */
    constructor(rounds,time){
        this.moves=[["-","-","-"],["-","-","-"],["-","-","-"]];
        this.rounds=rounds;
        this.startPlayer=1
        this.turn=this.startPlayer;
        this.board=new Board()
        this.board.createBoard();
        this.board.addEventListenersToBoaed(this);
        this.players={
            player1: new Player(1,time,"X"),
            player2: new Player(2,time,"O")
        };
        this.player1Timer=new Timer(this,this.players.player1);
        this.player2Timer=new Timer(this,this.players.player2);
        this.player1Timer.startTurn();
    }
    startNewRound(){
    /* 
        This method will start a round by creating new board and switch symbols 
        "X","O" and restart timer.
    */
        this.moves=[["-","-","-"],["-","-","-"],["-","-","-"]];
        this.board.createBoard(); 
        this.player1Timer.setTime();
        this.player2Timer.setTime();
        if (this.startPlayer==1) {
            this.player2Timer.startTurn();
            this.startPlayer=2;
            this.turn=this.startPlayer;
        }else{
            this.player1Timer.startTurn();
            this.startPlayer=1;
            this.turn=this.startPlayer;
        }
        this.rounds-=1
    }
    
    addPlayerMove(player,index){
    /*
        This method will add player move and show it in the board and also
        verify if the player has won 
    */
        if (this.moves[Number(index[0])][Number(index[1])]=="-") {
            this.board.addMove(Number(index[0]),Number(index[1]),player.symbol)
            this.moves[Number(index[0])][Number(index[1])]=player.symbol;

            if (this.#checkWins(player.symbol)){ 
                if (this.rounds>1) {
                    this.showResult(this.turn)   
                }else{
                    this.showGameResult()
                }
                return "Round ended"
            }
            else{
                if (!this.#CheckTie()) {
                    if (this.rounds>1) {
                        this.showResult()
                    }else{
                        this.showGameResult()
                    }
                    return "Round ended"
                }
            } 
            return true   
        }
        
        return false
    }
    #checkWins(symbol){
    /*
        This method will verify if the player has won by checking his symbol on the board.
    */
        if(this.#checkLines(symbol) || this.#checkColumns(symbol) || this.#checkDiagonals(symbol)){
            if (this.turn==1) {
                this.players.player1.addWin();
                this.players.player2.addLosse();
            }
            else{
                this.players.player2.addWin();
                this.players.player1.addLosse();
            }
            return true;
        }
        else{
            return false;
         }
    }
    #CheckTie(){
    /* 
        This method will check if the result was tie
        by checking if all the boxes is played
    */
        let rslt=false;
        let linerslt=false;
        this.moves.forEach((line)=>{
            linerslt=line.find((elm)=>{
                return elm=="-" ;
            })
            if (linerslt=="-") {
                rslt= true;  
            }
        })
        if (!rslt) {
            this.players.player1.addDraws();
            this.players.player2.addDraws();
        }
        return rslt;
    }
    #checkLines(symbol){
    /*
        this method will check the lines of the board to identify 
        if the player has won
    */
        let consistentSymbol=0;
        for (let index = 0; index < 3; index++) {
            for (let index2 = 0; index2 < 3; index2++) {
                if (this.moves[index][index2]==symbol) {
                    consistentSymbol++
                }
            }
            if (consistentSymbol==3) {
                return true
            }else{
                consistentSymbol=0;
            }
        }
        return false
    }
    #checkColumns(symbol){
    /*
        this method will check the columns of the board to identify 
        if the player has won
    */
        let consistentSymbol=0;
        for (let index = 0; index < 3; index++) {
            for (let index2 = 0; index2 < 3; index2++) {
                if (this.moves[index2][index]==symbol) {
                    consistentSymbol++
                }
            }
            if (consistentSymbol==3) {
                return true
            }else{
                consistentSymbol=0;
            }
        }
        return false
    }
    #checkDiagonals(symbol){
    /*
        This method will check the Diagonals of the board to identify 
        if the player has won
    */
        let consistentSymbol=0;
        let consistentSymbol2=0;
        for (let index = 0; index < 3; index++) {
            if (this.moves[index][index]==symbol) {
                consistentSymbol++
            }
            if (this.moves[index][2-index]==symbol) {
                consistentSymbol2++
            } 
        }
        if (consistentSymbol==3 || consistentSymbol2==3) {
            return true
        }
        else{
            return false
        }
    }
    showResult(prop=NaN){
    /*
        This method will show the result of the round to user
    */
        const resultContainer=document.querySelector('.round-Result');
        const roundResultContainer = document.querySelector('.round-result-container');
        if (prop) {
            resultContainer.innerHTML=`Player ${prop} Won this round`;
        }
        else{
        resultContainer.innerHTML=`The result is a draw`; 
        }
        roundResultContainer.classList.toggle("hidden");
    }
    showGameResult(){
    /*
        This method will show the game of the round to user
    */
        const resultContainer=document.querySelector('.game-Result');
        const roundResultContainer = document.querySelector('.game-result-container');
        if (this.players.player1.numberOfWins==this.players.player2.numberOfWins) {
            resultContainer.innerHTML=`The result is a Draw`
        }
        else{
            if (this.players.player1.numberOfWins>this.players.player2.numberOfWins) {
                resultContainer.innerHTML=`Player 1 Won this Game`
            }
            else{
                resultContainer.innerHTML=`Player 2 Won this Game`
            } 
        }
        roundResultContainer.classList.toggle("hidden")
    }

}
