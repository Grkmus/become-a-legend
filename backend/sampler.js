const Player = require('./models/player')
const Team = require('./models/team')
const Match = require('./models/match')
const DbPlayer = require('./services/player-service')      
const DbSport = require('./services/sport-service')      
const DbMatch = require('./services/match-service')      
const DbLeague = require('./services/league-service')      
const DbTeam = require('./services/team-service')
const Faker = require('faker')
      
console.log('sampler!!!')
const Mongoose = require('mongoose')

require('./mongo-connection')

async function seed() {
    for (let i = 0; i < 50; i++) {
        const player = {
            name: Faker.name.firstName(),
            surname: Faker.name.lastName(),
            email: Faker.internet.email(),
            imageURL: Faker.internet.avatar(),
            age: Faker.random.number({ min: 10, max: 50 }),
            weight: Faker.random.number({ min:20, max: 150 }),
            height: Faker.random.number({ min:100, max: 250 }),
            location: Faker.address.city(),
            telephone: Faker.phone.phoneNumber(),
            ratingsByOwn: {
                power: Faker.random.number({ min: 1, max: 10 }),
                speed: Faker.random.number({ min: 1, max: 10 }),
                stamina: Faker.random.number({ min: 1, max: 10 }),
                handling: Faker.random.number({ min: 1, max: 10 }),
                offense: Faker.random.number({ min: 1, max: 10 }),
                defense: Faker.random.number({ min: 1, max: 10 }),
                teamplay: Faker.random.number({ min: 1, max: 10 }),
                individualSkill: Faker.random.number({ min: 1, max: 10 }),
            }
        }
        player.ratingEvaluation = await DbPlayer.evaluateQuiz(player.ratingsByOwn)
        Player.create(player)
    }
}

seed()
    



