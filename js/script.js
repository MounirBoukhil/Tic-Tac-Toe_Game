"use strict"
const boxes = document.querySelectorAll(".box");
console.log(boxes)


/* Palyer class */
class Player{
    constructor(id,time,numberOfWins,numberOfLosses){
        this.id=id;
        this.time=time;
        this.numberOfWins=numberOfWins;
        this.numberOfLosses=numberOfLosses;
    }
}

class Board{
    constructor(){
        this.boxes = this.#createMatrix(document.querySelectorAll(".box"))
    }
    createBoard(){
        this.boxes.forEach(line=>{
            line.forEach(box=>{
                box.addEventListener("click",()=>{console.log("clik")})
                box.innerHTML="-";})
        })
        console.log(this.boxes);
    }
    #createMatrix(list){
        //this method will change a list to 3X3 matrix
        let matrix=[[new Array()],[new Array()],[new Array()]]
        console.log(matrix);
        let i=0;
        let j=0;
        list.forEach(elm=>{
            matrix[i][j]=elm;
            console.log(i);
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
        this.players={
            player1: new Player(1,time,0,0),
            player2: new Player(2,time,0,0)
        };
    }
}

const b = new Board();
b.createBoard();