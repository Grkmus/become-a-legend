const PlayerService = require('./services/player-service')      
      SportService = require('./services/sport-service')      
      MatchService = require('./services/match-service')      
      LeagueService = require('./services/league-service')      
      TeamService = require('./services/team-service')      

const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.set('view engine', 'pug')
app.use(bodyParser.json())

//landing page
app.get('/', (req, res) => {
    res.render('index')
})

//Find all sports
app.get('/sport/all', async (req, res) => {
    const sports = await SportService.read('./database/Sports.json')
    //console.log(sports)
    res.render('sport', { sports })
})

//Find all Players
app.get('/player/all', async (req, res) => {
    const players = await PlayerService.findAll()
    //console.log(players)
    res.render('player', { players })
})

//Add a Player
app.post('/player', async (req, res) => {
    const player = await PlayerService.add(req.body)
    //console.log(req.body)
    res.send(player)
})

//Find a player
app.get('/player/:id', async (req, res) => {
    const player = await PlayerService.find(req.params.id)
    //console.log(player)
    res.render('playerProfile', { player })
})

//Delete a player
app.delete('/player/:id', async (req, res) => {
    const playerId = await PlayerService.del(req.params.id)
    //console.log(playerId)
    res.send(playerId)
})

//Find all teams
app.get('/team/all', async (req, res) => {
    const teams = await TeamService.findAll()
    //console.log(teams)
    res.render('team', { teams })
})

//Add a team
app.post('/team', async (req, res) => {
    const team = await TeamService.add()
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

app.listen(3000, () => {
    console.log('Server listening')
})


      
// const football = new Sport('Football')
//       tableTennis = new Sport('Table Tennis')
//       basketball = new Sport('Basketball')
//       chess = new Sport('Chess')

// const premierLeague = new League('Premier League', football)


// football.addLeague(premierLeague)



// const gorkem = new Player('Görkem', 'Tosun', 28)
//       mehmet = new Player('Mehmet', 'Akif', 32)
//       cagatay = new Player('Cagatay', 'Cavus', 29)

// const lakers = new Team('Lakers', basketball )
//       besiktas = new Team('Besiktas', football)
//       wizards = new Team('Wizards', basketball)

// premierLeague.addTeam(besiktas)
// premierLeague.addTeam(lakers)



// gorkem.play(football)
// gorkem.play(basketball)

// mehmet.play(football)
// mehmet.play(chess)

// cagatay.play(football)
// cagatay.play(tableTennis)

// gorkem.joinTeam(lakers)
// cagatay.joinTeam(lakers)
// mehmet.joinTeam(besiktas)


// // console.log(football)



// // const match1 = new Match(basketball, [lakers, wizards], 'Staples Center', '21 March - 21:00' )


// /*
// Saving all class instances

// It is not important the sequence of the saving process. However it is important to wait until 
// the whole save process is finished. That's why I put all the save methods into one promise.
// */
// const saveAll = function() {
//     return new Promise((resolve, reject) => {
//         console.log('1')
//         const players = [gorkem, cagatay, mehmet]
//         DbPlayer.save(players)
        
//         console.log('2')
//         const sports = [football, tableTennis, basketball, chess]
//         DbSport.save(sports)
        
//         console.log('3')
//         const matches = [match1]
//         DbMatch.save(matches)
        
//         console.log('4')
//         const leagues = [premierLeague]
//         DbLeague.save(leagues)
        
//         console.log('5')
//         const teams = [lakers, besiktas, wizards]
//         DbTeam.save(teams)

//         resolve()
//     })
// }

// const saveAndRead = async () => {

//     //We should save all first
//     await saveAll()
   
//     //Then read.
//     console.log('6')
//     const contentsPlayers = await DbPlayer.read('./database/Players.json')
//     console.log(contentsPlayers)

//     console.log('7')
//     const contentsSports = await DbSport.read('./database/Sports.json')
//     console.log(contentsSports)

//     console.log('8')
//     const contentsMatches = await DbMatch.read('./database/Matches.json')
//     console.log(contentsMatches)

//     console.log('9')
//     const contentsTeams = await DbTeam.read('./database/Teams.json')
//     console.log(contentsTeams)

//     console.log('10')
//     const contentsLeagues = await DbLeague.read('./database/Leagues.json')
//     console.log(contentsLeagues)
// }

// saveAndRead()



