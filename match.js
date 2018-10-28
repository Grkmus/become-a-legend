module.exports = class Match {
    constructor(sport, opponents, location, date) {
        this.sport = sport
        this.opponents = [opponents]
        this.location = location
        this.date = date
    }

    static create({sport, opponents, location, date}){
        return new Match(sport, opponents, location, date)
    }
}