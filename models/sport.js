const Player = require('./player')
const Team = require('./team')
const League = require('./league')

module.exports = class Sport {
    constructor(name) {
        this.name = name
        this.players = []
        this.teams = []
        this.leagues = []
    }

    static create( {name} ) {
        const sport = new Sport(name)
        sport.players = players.map(Player.create)
        sport.teams = teams.map(Team.create)
        sport.leagues = leagues.map(League.create)
        return sport
    }

    addLeague(league) {
        this.leagues.push(league)
    }
}