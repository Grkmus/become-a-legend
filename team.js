module.exports = class Team {
    constructor (name, sport) {
        this.name = name
        this.players = []
        this.sport = sport
        this.league = null
        sport.teams.push(this)
    }

    addToLeague(league) {
        this.league = league
        league.teams.push(this)
    }
}