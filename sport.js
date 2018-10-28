module.exports = class Sport {
    constructor(name) {
        this.name = name
        this.players = []
        this.teams = []
        this.leagues = []
    }

    static create( {name} ) {
        return new Sport (name)
    }
}