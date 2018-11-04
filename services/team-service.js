const fs = require('fs')
const JSON = require('circular-json')
const Team = require('../models/team')
const Faker = require('faker')

const dbPath = `${__dirname}/../database/Teams.json`

async function findAll() {
    return new Promise((resolve, reject) => {
        fs.readFile(dbPath, 'utf8', (err, file) => {
            if (err) return reject(err)
            const teams = JSON.parse(file)
            teams.map(Team.create)
            resolve(teams)
        })
    })
}

async function add(team) {
    const allteams = await findAll()
    team.id = Faker.random.uuid()
    allteams.push(team)
    await saveAll(allteams)
}

async function del(teamId) {
    const allteams = await findAll()
    const teamIndex = allteams.findIndex(p => p.id == teamId)
    if (teamIndex < 0) return

    allteams.splice(teamIndex, 1)

    saveAll(allteams)
}

async function find(teamId) {
    const allteams = await findAll()

    return allteams.find(p => p.id == teamId)
}

async function saveAll(teams) {
    return new Promise((resolve, reject) => {
        fs.writeFile(dbPath, JSON.stringify(teams), (err, file) => {
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
