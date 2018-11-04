const fs = require('fs')
const JSON = require('circular-json')
const Player = require('../models/player')
const Faker = require('faker')

const dbPath = `${__dirname}/../database/Players.json`

async function findAll() {
    return new Promise((resolve, reject) => {
        fs.readFile(dbPath, 'utf8', (err, file) => {
            if (err) return reject(err)
            const players = JSON.parse(file)
            players.map(Player.create)
            resolve(players)
        })
    })
}

async function add(player) {
    const allPlayers = await findAll()
    player.name = Faker.name.firstName()
    player.surname = Faker.name.lastName()
    player.age = Faker.random.number({
        min: 18,
        max: 50
    })
    player.id = Faker.random.uuid()
    player.sports = []
    allPlayers.push(player)
    await saveAll(allPlayers)
}

async function del(playerId) {
    const allPlayers = await findAll()
    const playerIndex = allPlayers.findIndex(p => p.id == playerId)
    if (playerIndex < 0) return

    allPlayers.splice(playerIndex, 1)

    saveAll(allPlayers)
}

async function find(playerId) {
    const allPlayers = await findAll()

    return allPlayers.find(p => p.id == playerId)
}

async function saveAll(players) {
    return new Promise((resolve, reject) => {
        fs.writeFile(dbPath, JSON.stringify(players), (err, file) => {
            if (err) return reject(err)

            resolve()
        })
    })
}

module.exports = {
    findAll,
    find,
    saveAll,
    add,
    del
}
