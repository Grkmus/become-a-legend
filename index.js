const Player = require('./player')
      Sport = require('./sport')
      Team = require('./team')
      Match = require('./match')
      League = require('./league')
      DbPlayer = require('./dbPlayer')      
      DbSport = require('./dbSport')      
      DbMatch = require('./dbMatch')      
      DbLeague = require('./dbLeague')      
      DbTeam = require('./dbTeam')      

      
const football = new Sport('Football')
      tableTennis = new Sport('Table Tennis')
      basketball = new Sport('Basketball')
      chess = new Sport('Chess')

const premierLeague = new League('Premier League', football)

const gorkem = new Player('Görkem', 'Tosun', 28)
      mehmet = new Player('Mehmet', 'Akif', 32)
      cagatay = new Player('Cagatay', 'Cavus', 29)

const lakers = new Team('Lakers', basketball )
      besiktas = new Team('Besiktas', football)
      wizards = new Team('Wizards', basketball)

gorkem.play(football)
gorkem.play(basketball)

mehmet.play(football)
mehmet.play(chess)

cagatay.play(football)
cagatay.play(tableTennis)

gorkem.joinTeam(lakers)
cagatay.joinTeam(lakers)
mehmet.joinTeam(besiktas)


const match1 = new Match(basketball, [lakers, wizards], 'Staples Center', '21 March - 21:00' )


/*
Saving all class instances

It is not important the sequence of the saving process. However it is important to wait until 
the whole save process is finished. That's why I put all the save methods into one promise.
*/
const saveAll = function() {
    return new Promise((resolve, reject) => {
        console.log('1')
        const players = [gorkem, cagatay, mehmet]
        DbPlayer.save(players)
        
        console.log('2')
        const sports = [football, tableTennis, basketball, chess]
        DbSport.save(sports)
        
        console.log('3')
        const matches = [match1]
        DbMatch.save(matches)
        
        console.log('4')
        const leagues = [premierLeague]
        DbLeague.save(leagues)
        
        console.log('5')
        const teams = [lakers, besiktas, wizards]
        DbTeam.save(teams)

        resolve()
    })
}

const saveAndRead = async () => {

    //We should save all first
    await saveAll()
   
    //Then read.
    console.log('6')
    const contentsPlayers = await DbPlayer.read('./database/Players.json')
    console.log(contentsPlayers)

    console.log('7')
    const contentsSports = await DbSport.read('./database/Sports.json')
    console.log(contentsSports)

    console.log('8')
    const contentsMatches = await DbMatch.read('./database/Matches.json')
    console.log(contentsMatches)

    console.log('9')
    const contentsTeams = await DbTeam.read('./database/Teams.json')
    console.log(contentsTeams)

    console.log('10')
    const contentsLeagues = await DbLeague.read('./database/Leagues.json')
    console.log(contentsLeagues)
}

saveAndRead()



