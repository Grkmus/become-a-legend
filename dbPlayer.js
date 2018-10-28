const fs = require('fs')
//const JSON = require('circular-json')


async function save(data) {
    return new Promise((resolve, reject) => {
        fs.writeFile('./database/Players.json', JSON.stringify(data), (err, file) => {
            if (err) return reject(err)
            resolve()
        })
    })
}

async function read(dbPath) {
    return new Promise((resolve, reject) => {
        fs.readFile(dbPath, 'utf8', (err, file) => {
            if (err) return reject(err)
                const players = JSON.parse(file)
            resolve(players)
        })
    })
}

module.exports = {
    save,
    read
}

