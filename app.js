const PlayerService = require('./services/player-service')      
const TeamService = require('./services/team-service')
const DailyEventService = require('./services/dailyEvent-service')
const mongoose    = require('mongoose')
const Faker = require('faker')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

require('./mongo-connection')

app.set('view engine', 'pug')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"))

//================== Index Endpoints ===============

//landing page
app.get('/', (req, res) => {
    res.render('index')
})

//show registration form
app.get('/register', (req, res) => {
    res.render('preRegistration')
})

//post registration form 
app.post('/register', async (req, res) => {
    const player = await PlayerService.add({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email
    })
    res.redirect('/player/' + player._id)
})

//================== Player Endpoints ===============

//Find all Players
app.get('/player/all', async (req, res) => {
    const players = await PlayerService.findAll()
    res.send(players)
})

//Add a Player
app.post('/player', async (req, res) => {
    const player = await PlayerService.add(req.body)
    res.send(player)
})

//Find a player
app.get('/player/:id/json', async (req, res) => {
    const player = await PlayerService.find(req.params.id)
    //console.log(!player)
    if (player == undefined || null) res.status(404)
    res.send(player)
})

app.get('/player/:id', async (req, res) => {
    const player = await PlayerService.find(req.params.id)
    //console.log(!player)
    if (!player) res.status(404)
    res.render('playerProfile', { player })
})

//Delete a player
app.delete('/player/:id', async (req, res) => {
    await PlayerService.del(req.params.id)
    //console.log(playerId)
    res.send('ok!')
})

//Player Identity form
app.get('/player/:id/quiz', async (req, res) => {
    const player = await PlayerService.find(req.params.id)
    res.render('playerQuizForm', { player })
})

//Player Identity form update
app.put('/player/:id/quiz', async (req, res) => {
    const data = await PlayerService.takeQuiz(req.body, req.params.id)
    const player = await PlayerService.update(req.params.id, data)
    res.send(player)
})

//Attend to an Event
// app.post('/player/:playerId/attend/daily-event/:eventId', async (req, res) => {
//     const event = await PlayerService.attendToEvent(req.params.playerId, req.params.eventId)
//     //console.log(event)
//     res.send(event)
// })

//================== Team Endpoints ===============

//Find all teams 
app.get('/team/all', async (req, res) => {
    const teams = await TeamService.findAll()
    //console.log(teams)
    res.send(teams)
})

//Add a team
app.post('/team', async (req, res) => {
    const team = await TeamService.add(req.body)
    //console.log(team)
    res.send(team)
})

//find a team
app.get('/team/:id', async (req, res) => {
    const team = await TeamService.find(req.params.id)
    //console.log(team)
    if (!team) res.status(404)
    res.send(team)
})

//delete a team
app.delete('/team/:id', async (req, res) => {
    await TeamService.del(req.params.id)
    //console.log('team successfully deleted: ' + teamId)
    res.send('ok!')
})

//================== Daily Event Endpoints ===============

//find all events
app.get('/daily-event/all', async (req, res) => {
    const dailyEvents = await DailyEventService.findAll()
    res.send(dailyEvents)
})

//create an event
app.post('/daily-event', async (req, res) => {
    const dailyEvent = await DailyEventService.add(req.body)
    DailyEventService.phase1(dailyEvent._id)
    res.send(dailyEvent)
})


//get an event
app.get('/daily-event/:id', async (req, res) => {
    const dailyEvent = await DailyEventService.find(req.params.id)
    res.send(dailyEvent)
})

//Add attendee to an event
app.post('/daily-event/:_id/attendee', async (req, res) => {
    const dailyEvent = await DailyEventService.addAttendee(req.params._id, req.body._id)
    res.send(dailyEvent)
})

//get teams of the event
app.get('/daily-event/:id/team/all', async (req, res) => {
    const dailyEvent = await DailyEventService.find(req.params.id)
    res.send(dailyEvent.teams)
})

//Get a team in event
app.get('/daily-event/:eventId/team/:teamId/', async (req, res) => {
    const dailyEvent = await DailyEventService.find(req.params.eventId)
    dailyEvent.teams.forEach(team => {
        if (team._id == req.params.teamId) {
            res.send(team)
        }
    });
})

//Captain picks a player
app.post('/daily-event/:eventId/team/:teamId/pick', async (req, res) => {
    await DailyEventService.captainPicksPlayer(req.params.eventId, req.params.teamId, req.body._id) 
    res.redirect(`/daily-event/${req.params.eventId}`)
})

module.exports = app

