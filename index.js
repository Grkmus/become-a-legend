const Player = require('./player')
      Sport = require('./sport')
      Team = require('./team')
      Match = require('./match')
      League = require('./league')
      Database = require('./database')      

      
const football = new Sport('Football')
      tableTennis = new Sport('Table Tennis')
      basketball = new Sport('Basketball')
      chess = new Sport('Chess')

const premierLeague = new League('Premier League', football)

const gorkem = new Player('Görkem', 'Tosun', 28)
      mehmet = new Player('Mehmet', 'Akif', 32)
      cagatay = new Player('Cagatay', 'Cavus', 29)

const tigers = new Team('Tigers', basketball )
      besiktas = new Team('Besiktas', football)
      Wizards = new Team('Wizards', basketball)

gorkem.play(football)
gorkem.play(basketball)

gorkem.joinTeam(tigers)
cagatay.joinTeam(tigers)
mehmet.joinTeam(besiktas)

cagatay.play(football)
cagatay.play(tableTennis)

mehmet.play(chess)

const match1 = new Match(football, [gorkem,cagatay], 'Ali Sami Yen', '21 March - 21:00' )

Database.save(match1)



// console.log(gorkem, cagatay, mehmet)
console.log(Database.load().sport.name)

