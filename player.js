module.exports = class Player {
    constructor(name, surname, age) {
        this.name = name
        this.surname = surname
        this.age = age
        this.sports = []
        this.teams = []
    }
    
    play(sport) {
        this.sports.push(sport)
        //sport.players.push(this)
    }

    joinTeam(team) {
        this.teams.push(team)
        //team.players.push(this)
    }

    static create({ name, surname, age }) {
        return new Person(name, surname, age)
    }
}