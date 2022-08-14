"use strict"
/* Palyer class */
class Player{
    constructor(id,time,symbol){
        this.id=id;
        this.time=time;
        this.numberOfWins=0;
        this.numberOfLosses=0;
        this.numberOfDraws=0;
        this.symbol=symbol;
        console.log(`Symbol : ${this.symbol}`);
    }
    addWin(){
        const playerWinnInterface=document.querySelector(`.player${this.id}-wins`);
        this.numberOfWins+=1;
        playerWinnInterface.innerHTML=`Wins = ${this.numberOfWins}`;
    }
    addLosse(){
        const playerLossesInterface=document.querySelector(`.player${this.id}-losses`);
        this.numberOfLosses+=1;
        playerLossesInterface.innerHTML=`Losses = ${this.numberOfLosses}`;
    }
    addDraws(){
        const playerDrawsInterface=document.querySelector(`.player${this.id}-draws`);
        this.numberOfDraws+=1;
        playerDrawsInterface.innerHTML=`Draws = ${this.numberOfDraws}`;
    }
}

class Board{
    constructor(){
        this.boxes = this.#createMatrix(document.querySelectorAll(".box"))
    }
    createBoard(){
        this.boxes.forEach(line=>{
            line.forEach(box=>{
                //box.addEventListener("click",()=>{console.log("clik")})
                box.innerHTML="-";})
        })
    }
    addMove(lineIndex,rowIndex,character){
        this.boxes[lineIndex][rowIndex].innerHTML=character
    }
    #createMatrix(list){
        //this method will change a list to 3X3 matrix
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
}

class Game{
    constructor(rounds,time){
        this.moves=[["-","-","-"],["-","-","-"],["-","-","-"]];
        this.rounds=rounds;
        this.startPlayer=1
        this.turn=this.startPlayer;
        this.board=new Board()
        this.board.createBoard();
        this.players={
            player1: new Player(1,time,"X"),
            player2: new Player(2,time,"O")
        };
    }
   
    addEventListenersToBoaed(){
        //this function will add event listener to a bunch of elements
        this.board.boxes.forEach((line)=>{
            line.forEach((box)=>{
                box.addEventListener("click",()=>{
                if (this.turn==1) {
                    if(this.#addPlayerMove(this.players.player1,box.id)){
                        this.turn=2;
                    }
                }else{
                    if (this.turn==2) {
                        if(this.#addPlayerMove(this.players.player2,box.id)){
                            this.turn=1; 
                        }
                    }
                }
                })
            })
        })
    }
    startNewRound(){
        this.moves=[["-","-","-"],["-","-","-"],["-","-","-"]];
        this.board.createBoard();
        this.#switchSymbol();
        if (this.startPlayer==1) {
            this.startPlayer=2;
            this.turn=this.startPlayer;
        }else{
            this.startPlayer=1;
            this.turn=this.startPlayer;
        }
    }
    #switchSymbol(){
        let symbol=this.players.player1.symbol;
        this.players.player1.symbol=this.players.player2.symbol;
        this.players.player2.symbol=symbol;
        console.log(`player1: ${this.players.player1.symbol}`);
        console.log(`player2: ${this.players.player2.symbol}`);
    }
    #addPlayerMove(player,index){
        /*This method will add player move and show it in the board and also
         verify if the player has won */
        if (this.moves[Number(index[0])][Number(index[1])]=="-") {
            this.board.addMove(Number(index[0]),Number(index[1]),player.symbol)
            this.moves[Number(index[0])][Number(index[1])]=player.symbol;
            //console.log("Tie="+this.#CheckTie());

            if (this.#checkWins(player.symbol)){
                this.#showResult(this.turn)
            }
            else{
                if (!this.#CheckTie()) {
                    this.#showResult()
                }
            } 
            return true   
        }
        
        return false
    }
    #checkWins(symbol){
        // This method will check if the player has won.
        if(this.#checkLines(symbol) || this.#checkColumns(symbol) || this.#checkDiagonals(symbol)){
            if (this.turn==1) {
                this.players.player1.addWin();
                this.players.player2.addLosse();
            }
            else{
                this.players.player2.addWin();
                this.players.player1.addLosse();
            }
             this.rounds-=1;
            // console.log("WINN");
            // console.log(`Player1:${this.players.player1.numberOfWins}`);
            // console.log(`Player2:${this.players.player2.numberOfWins}`);
            // console.log(`Rounds:${this.rounds}`);
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
        /*this method will check the lines of the board to identify 
        if the player has won*/
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
        /*this method will check the columns of the board to identify 
        if the player has won*/
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
        /*this method will check the Diagonals of the board to identify 
        if the player has won*/
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
    #showResult(prop=NaN){
        const resultContainer=document.querySelector('.game-Result');
        const gameResultContainer = document.querySelector('.game-result-container');
        if (prop) {
            resultContainer.innerHTML=`Player ${prop} Won this round`
        }
        else{
        resultContainer.innerHTML=`The result is a draw` 
        }
        gameResultContainer.classList.toggle("hidden")
    }
}


/*
    I added gameScript 
        addWin() method
        addLosse() method

*/
