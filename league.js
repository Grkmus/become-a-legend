module.exports = class League {
    constructor(name, sport) {
        this.name = name
        this.sport = sport
        this.teams = []
        sport.leagues.push(this)
    }
}