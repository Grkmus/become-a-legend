const PlayerModel = require('../models/player')
const DailyEventService = require('../services/dailyEvent-service')

async function takeQuiz(data) {
    data.ratingEvaluation = await evaluateQuiz(data.ratingsByOwn)
    return data
}

async function update(playerId, data) {
    return PlayerModel.findOneAndUpdate({ _id: playerId }, data, { new: true })
}
async function evaluateQuiz(quiz){
    return new Promise((resolve, reject) => {
        valuesList = Object.values(quiz)
        var element = 0
        for (let i = 0; i < valuesList.length; i++) {
            element += +valuesList[i];
        }
        element /= valuesList.length
        resolve(element)
    })
}

async function findAll() {
    return PlayerModel.find()
}

async function add(player) {
    return PlayerModel.create(player)
}


async function del(playerId) {
    return PlayerModel.deleteOne({ _id: playerId })
}

async function find(playerId) {
    return PlayerModel.findOne({ _id: playerId })
}



module.exports = {
    findAll,
    find,
    add,
    del,
    update,
    takeQuiz,
    evaluateQuiz
}
