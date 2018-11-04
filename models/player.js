const Match = require('./match')

module.exports = class Player {
    constructor(name, surname, age, id) {
        this.name = name
        this.surname = surname
        this.age = age
        this.id = id
    }
    
    play(sport) {
        this.sports.push(sport)
        sport.players.push(this)
    }

    joinTeam(team) {
        this.teams.push(team)
        team.players.push(this)
    }

    createTeam(name, sport) {
        if (this.sports.includes(sport)) {
            Team.create({name: name, sport: sport})
        } else {
            console.log('You can not create a team in a sport that you dont play!!')
        }
        
    }

    inviteToTeam(player) {

    }

    
    static create({ name, surname, age, id }) {
        return new Player(name, surname, age, id)
    }
}