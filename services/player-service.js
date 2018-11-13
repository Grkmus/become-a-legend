const PlayerModel = require('../models/player')
const DailyEventService = require('../services/dailyEvent-service')

async function takeQuiz(data, id) {
    console.log(data['age']);
    const player = {
        age: data['age'],
        height: data['height'],
        weight: data['weight'],
        location: data['location'],
        telephone: data['telephone'],
        rolePreference: data['rolePreference'],
        quiz: {
            lastPartInSport: data['lastPartInSport'],
            lastPartInBasketball: data['lastPartInBasketball'],
            health: data['health'],
            power: data['power'],
            speed: data['speed'],
            stamina: data['stamina'],
            handling: data['handling'],
            offense: data['offense'],
            defense: data['defense'],
            teamplay: data['teamplay'],
            individualSkill: data['individualSkill'],
        }
        
    }
    player.quizEvaluation = await evaluateQuiz(player.quiz)
    await PlayerModel.findOneAndUpdate({_id:id}, player)
}

async function evaluateQuiz(quiz) {
    valuesList = Object.values(quiz)
    var element = 0
    for (let i = 0; i < valuesList.length; i++) {
        element += +valuesList[i];
    }
    element /= valuesList.length
    return element.toFixed(2)
}

async function findAll() {
    return PlayerModel.find()
}

async function add(player) {
    return PlayerModel.create(player)
}

async function del(playerId) {
    return PlayerModel.remove({ playerId })
}

async function find(playerId) {
    return PlayerModel.findById(playerId)
}

async function addPlayerToTeam(playerId, teamId) {
    const player = await find(playerId)
    const team = await TeamService.find(teamId)
    team.players.push(player)
    return team
}

async function attendToEvent(playerId, eventId) {
    const player = await find(playerId)
    const event = await DailyEventService.find(eventId)
    console.log(event)
    const isInArray = event.attendees.some((attendeeId) => {
        return attendeeId.equals(player._id)
    })
    if (!isInArray) {
        event.attendees.push(player)
        return await event.save()
    } else {
        console.log('player already in the list')
    }
        
}

module.exports = {
    findAll,
    find,
    add,
    del,
    takeQuiz,
    attendToEvent
}
