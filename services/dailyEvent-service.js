const DailyEventModel = require('../models/dailyEvent')
const PlayerModel = require('../models/player')
const TeamModel = require('../models/team')
const TeamService = require('./team-service')
const Faker = require('faker')

async function findAll() {
    return DailyEventModel.find({})
}

async function add(event) {
    return DailyEventModel.create(event)
}

async function del(eventId) {
    return DailyEventModel.deleteOne({ _id: eventId })
}

async function update(eventId, data) {
    return DailyEventModel.findOneAndUpdate({ _id: eventId }, data, { new: true }).populate(['attendees', {
        path: 'teams',
        populate: { path: 'players' }
    }, 'attendeesToBeSelected'])
}

async function find(eventId) {
    return DailyEventModel.findOne({ _id: eventId }).populate(['attendees', {
        path: 'teams',
        populate: { path: 'players' }
    }, 'attendeesToBeSelected'])
}

async function addAttendee(eventId, attendeeId) {
    const event =  await DailyEventModel.findOne({ _id: eventId }).populate(['attendees'])
    const attendee = await PlayerModel.findOne({ _id: attendeeId })
    event.attendees.forEach(element => {
        if(element._id.equals(attendee._id)) throw new Error('Already in the list')
    }) 
    event.attendees.push(attendee)
    event.attendeesToBeSelected.push(attendee)
    return await update(event._id, event)
}



async function phase1(eventId, date) {
    const duration = date - Date.now()
    //Wait attendees to join for one week
    // console.log('phase1')
    return new Promise(async (resolve, reject) => {
        setTimeout(async () => {
            const event = await find(eventId)
            if (event.attendees < 12) {
                await del(event._id)
                reject(new Error('not enough participant'))
            } else {
                event.phase = 'phase1'
                await event.save()
                phase2(event)
                resolve('ok')
            }
        }, duration);
    })
}


async function phase2(eventId) {
    return new Promise(async (resolve, reject) => {
        const event = await find(eventId)
        event.attendees.sort((a,b) =>  //c/o Marco Demaio https://goo.gl/APQFAS
            (a.ratingEvaluation > b.ratingEvaluation) ? -1 : ((b.ratingEvaluation > a.ratingEvaluation) ? 1 : 0)); 
        
        event.attendeesToBeSelected.sort((a,b) =>  //c/o Marco Demaio https://goo.gl/APQFAS
            (a.ratingEvaluation > b.ratingEvaluation) ? 1 : ((b.ratingEvaluation > a.ratingEvaluation) ? -1 : 0)); 
        
        const numberOfTeams = Math.floor(event.attendees.length / 3)
        
        for (let i = 0; i < numberOfTeams; i++) {
            const team = await TeamService.add({
                name: Faker.random.word(),
                players: [event.attendees[i]]
            })
            event.teams.push(team)
            // const playerIndex = event.attendeesToBeSelected.indexOf(event.attendees[i])
            event.attendeesToBeSelected.pop()
        }
        resolve(await calculateTeamCredits(event))
    })
}

async function calculateTeamCredits(event) {
    //Calculation of credit that each captain get
    return new Promise(async (resolve, reject) => {
        const totalPoint = (event.attendees.reduce(( a, b ) => {
            return {ratingEvaluation: a.ratingEvaluation + b.ratingEvaluation}
        })).ratingEvaluation
        
        const pointForEachTeam = totalPoint / event.teams.length
        
        event.teams.forEach(async (team) => {
            team.credits = (pointForEachTeam - team.players[0].ratingEvaluation + 3).toFixed(2)
            await team.save()
        })
        event.phase = 'phase2'
        resolve(await update(event._id, event))
    })
}

async function captainPicksPlayer(eventId, teamId, playerId) {
    await TeamService.addPlayerToTeam(teamId, playerId)
    const event = await find(eventId)
    const player = await PlayerModel.findOne({ _id: playerId })
    
    const indexPlayer = event.attendeesToBeSelected.findIndex(attendee => {
       return attendee._id.equals(player._id) 
    })
    event.attendeesToBeSelected.splice(indexPlayer, 1)
    return await update(event._id, event)
}


module.exports = {
    findAll,
    find,
    add,
    addAttendee,
    captainPicksPlayer,
    del,
    update,
    phase1,
    phase2
}


