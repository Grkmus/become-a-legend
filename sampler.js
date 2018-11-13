const Player = require('./models/player')
      Sport = require('./models/sport')
      Team = require('./models/team')
      Match = require('./models/match')
      League = require('./models/league')
      DbPlayer = require('./services/player-service')      
      DbSport = require('./services/sport-service')      
      DbMatch = require('./services/match-service')      
      DbLeague = require('./services/league-service')      
      DbTeam = require('./services/team-service')
      Faker = require('faker')
      
const Mongoose = require('mongoose')

Mongoose.connect('mongodb://localhost/become-a-legend', { useNewUrlParser: true })
    .then(() => {
        console.log('baglandi')
    })
    .catch(err => {
        console.error('something went wrong')
        console.error(err)
    })



// const football = new Sport('Football')
//       basketball = new Sport('Basketball')
//       volleyball = new Sport('Volleyball')
//       tableTennis = new Sport('Table Tennis')
//       chess = new Sport('Chess')
//       paintball = new Sport('Paintball')
// const sports = [football, tableTennis, basketball, chess, volleyball, paintball]


/*
Generating players 

All players has random name, surname and age. Sports property is being created by random for all players.

*/
// const players = []


for (let i = 0; i < 50; i++) {
    const player = {
        name: Faker.name.firstName(),
        surname: Faker.name.lastName(),
        email: Faker.internet.email(),
        imageURL: Faker.internet.avatar(),
        // age: Faker.random.number({ min: 10, max: 50 }),
        // weight: Faker.random.number({ min:20, max: 150 }),
        // height: Faker.random.number({ min:100, max: 250 }),
        // location: Faker.address.city(),
        // telephone: Faker.phone.phoneNumber()
    }
    Player.create(player)
}
    
    // player.picture = Faker.internet.avatar()
    // //determining how many sport does someone play randomly in the below line
    // const numberOfSports = Faker.random.number({ min:1, max:5 }) 
    // player.sports = []
    // for (let k = 0; k < numberOfSports; k++) {
    //     //determining which sport does someone play randomly in the below line
    //     const randomSport = Faker.random.arrayElement(sports)
    //     // if sport already choosen 
    //     if (player.sports.includes(randomSport)) {
    //         k--
    //         continue
    //     }else{
    //         player.play(randomSport)
    //     }
    // }
    // Player.create(player)




// const teams = []    
// for (let i = 0; i < 5; i++) {
//     const team = new Team(Faker.random.word(), football)
//     team.id = Faker.random.uuid()
//     if (teams.includes(team)) {
//         i--
//         continue
//     }else {
//         teams.push(team)
//     }
// }
// for (let i = 0; i < 5; i++) {
//     const team = new Team(Faker.random.word(), basketball)
//     team.id = Faker.random.uuid()
//     if (teams.includes(team)) {
//         i--
//         continue
//     }else {
//         teams.push(team)
//     }
// }
// for (let i = 0; i < 3; i++) {
//     const team = new Team(Faker.random.word(), volleyball)
//     team.id = Faker.random.uuid()
//     if (teams.includes(team)) {
//         i--
//         continue
//     }else {
//         teams.push(team)
//     }
// }
// console.log(players)
// console.log(teams)




/*
Saving all class instances

It is not important the sequence of the saving process. However it is important to wait until 
the whole save process is finished. That's why I put all the save methods into one promise.
*/


// const saveAndRead = async () => {

//     //We should save all first
//     //console.log(players)
//     await DbPlayer.saveAll(players)
//     //await DbTeam.saveAll(teams)
//     //await DbSport.save(sports)
//     //const allPlayers = await DbPlayer.findAll()
//     //console.log(allPlayers)
//     //Then read.
//     //console.log('6')
//     //const contentsPlayers = await DbPlayer.fi('./asdatabase/Players.json')
//     //console.log(contentsPlayers)

//     // console.log('7')
//     // const contentsSports = await DbSport.read('./database/Sports.json')
//     // console.log(contentsSports)

//     // console.log('8')
//     // const contentsMatches = await DbMatch.read('./database/Matches.json')
//     // console.log(contentsMatches)

//     //console.log('9')
//     //const contentsTeams = await DbTeam.read('./database/Teams.json')
//     //console.log(contentsTeams)
//     //contentsTeams.forEach(team => {
//     //    console.log(team.name + ', ' + team.sport.name)
//     //});
//     // console.log('10')
//     // const contentsLeagues = await DbLeague.read('./database/Leagues.json')
//     // console.log(contentsLeagues)
// }

// saveAndRead()



