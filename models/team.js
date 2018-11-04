const Player = require('./player')

module.exports = class Team {
    constructor (name, sport) {
        this.name = name
        this.players = []
        this.sport = sport 
        this.league = null
        sport.teams.push(this)
    }
    
    static create( {name, sport} ){
        const team = new Team(name, sport)
        return team
    }
}