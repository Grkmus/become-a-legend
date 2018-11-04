const Team = require('./Team')

module.exports = class League {
    constructor(name, sport) {
        this.name = name
        this.sport = sport
        this.teams = []
        sport.leagues.push(this)
    }

    static create( {name, sport} ) {
        const league = new League(name, sport)
        league.teams = teams.map(Team.create)
        return league
    }

    addTeam(team) {
        this.teams.push(team)
    }
}