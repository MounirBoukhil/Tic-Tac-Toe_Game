"use strict"
const boxes = document.querySelectorAll(".box");


/* Palyer class */
class Player{
    constructor(id,time,numberOfWins,numberOfLosses,symbol){
        this.id=id;
        this.time=time;
        this.numberOfWins=numberOfWins;
        this.numberOfLosses=numberOfLosses;
        this.symbol=symbol;
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
        this.turn=1;
        this.board=new Board()
        this.board.createBoard();
        this.players={
            player1: new Player(1,time,0,0,"X"),
            player2: new Player(2,time,0,0,"O")
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
                console.log(this.moves);
            })
            })
        })
    }
    #addPlayerMove(player,index){
        /*This method will add player move and show it in the board and also
         verify if the player has won */
        if (this.moves[Number(index[0])][Number(index[1])]=="-") {
            this.board.addMove(Number(index[0]),Number(index[1]),player.symbol)
            this.moves[Number(index[0])][Number(index[1])]=player.symbol;
            this.#checkWins(player.symbol)
            return true   
        }
        
        return false
    }
    #checkWins(symbol){
        // This method will check if the player has won.
        if(this.#checkLines(symbol) || this.#checkColumns(symbol) || this.#checkDiagonals(symbol)){
            console.log("WINN");
            return true;
        }
        else{
            return false;
         }

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
}
const g = new Game(2,2)
g.addEventListenersToBoaed();