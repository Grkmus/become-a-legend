const PlayerService = require('./services/player-service')      
const TeamService = require('./services/team-service')
const DailyEventService = require('./services/dailyEvent-service')
const mongoose    = require('mongoose')
const Faker = require('faker')
      
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

mongoose.connect('mongodb://localhost/become-a-legend', { useNewUrlParser: true })
.then(()=> {
    console.log('You did it! Your MongoDB is running.')
}).catch(err => {
    console.error('Something went wrong!')
    console.error(err)
})

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
    res.render('player', { players: players })
})

//Add a Player
app.post('/player', async (req, res) => {
    const player = await PlayerService.add(req.body)
    res.send(player)
})

//Find a player
app.get('/player/:id', async (req, res) => {
    const player = await PlayerService.find(req.params.id)
    //console.log(player.quizEvaluation !== null)
    res.render('playerProfile', { player })
})

//Delete a player
app.delete('/player/:id', async (req, res) => {
    const playerId = await PlayerService.del(req.params.id)
    //console.log(playerId)
    res.send(playerId)
})

//Player Identity form
app.get('/player/:id/quiz', async (req, res) => {
    const player = await PlayerService.find(req.params.id)
    res.render('playerQuizForm', { player })
})

//Player Identity form post
app.post('/player/:id/quiz', (req, res) => {
    const quizData = req.body
    quizData.rolePreference = quizData.rolePreference.split(',')
    PlayerService.takeQuiz(quizData, req.params.id)
    res.redirect('/player/' + req.params.id)
})

//Attend to an Event
app.post('/player/:playerId/attend/daily-event/:eventId', async (req, res) => {
    await PlayerService.attendToEvent(req.params.playerId, req.params.eventId)
    res.redirect('/daily-event/' + req.params.eventId)
})

//================== Team Endpoints ===============

//Find all teams 
app.get('/team/all', async (req, res) => {
    const teams = await TeamService.findAll()
    //console.log(teams)
    res.render('team', { teams })
})

//Add a team
app.post('/team', async (req, res) => {
    await TeamService.add({
        name: Faker.random.word
    })
    //console.log(team)
    res.send(team)
})

//find a team
app.get('/team/:id', async (req, res) => {
    const team = await TeamService.find(req.params.id)
    //console.log(team)
    res.render('teamProfile', { team })
})

//delete a team
app.delete('/team/:id', async (req, res) => {
    const teamId = await TeamService.del(req.params.id)
    //console.log('team successfully deleted: ' + teamId)
    res.send(teamId)
})

//================== Daily Tournament Endpoints ===============
app.get('/daily-event/all', async (req, res) => {
    const dailyEvents = await DailyEventService.findAll().catch(err => {
        console.log(err)
    })
    res.render('event', { dailyEvents })
})

app.post('/daily-event', async (req, res) => {
    await DailyEventService.add({
        name: 'mahmut',
        date: Date.now()
    })
})

//show the main page of a daily Tournament
app.get('/daily-event/:id', async (req, res) => {
    const dailyEvent = await DailyEventService.find(req.params.id)
    res.render('eventProfile', { dailyEvent })
})

//show the main page of a daily Tournament

app.listen(3000, () => {
    console.log('Server listening')
})
