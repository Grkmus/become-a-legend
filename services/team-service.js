const TeamModel = require('../models/team')

async function findAll() {
    return TeamModel.find()
}

async function add(team) {
    return TeamModel.create(team)
}

async function del(teamId) {
    return TeamModel.remove({ teamId })
}

async function find(teamId) {
    return TeamModel.findById(teamId)
}

module.exports = {
    findAll,
    find,
    add,
    del
}
