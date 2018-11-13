const DailyEventModel = require('../models/dailyEvent')
const PlayerService = require('../services/player-service')

async function findAll() {
    return DailyEventModel.find({})
}
async function add(event) {
    return DailyEventModel.create(event)
}

async function del(eventId) {
    return DailyEventModel.remove({ eventId })
}

async function find(eventId) {
    return DailyEventModel.findById(eventId)
}


module.exports = {
    findAll,
    find,
    add,
    del
}