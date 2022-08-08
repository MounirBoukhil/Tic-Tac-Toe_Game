"use strict"

/* Palyer class */

class Player{
    constructor(id,time,numberOfWins,numberOfLosses){
        this.id=id;
        this.time=time;
        this.numberOfWins=numberOfWins;
        this.numberOfLosses=numberOfLosses;
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