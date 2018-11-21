const TeamModel = require('../models/team')
const PlayerModel = require('../models/player')

async function findAll() {
    return TeamModel.find()
}

async function add(team) {
    return TeamModel.create(team)
}

async function del(teamId) {
    return TeamModel.deleteOne({ _id: teamId })
}

async function find(teamId) {
    return TeamModel.findOne({ _id: teamId })
}

async function addPlayerToTeam(teamId, playerId) {
    let team = await TeamModel.findOne({ _id: teamId })
    const player = await PlayerModel.findOne({ _id: playerId})

    team.players.push(player)

    await team.save()
    
}

module.exports = {
    findAll,
    find,
    add,
    addPlayerToTeam,
    del
}
