const fs = require('fs')
const JSON = require('circular-json')

module.exports = {
    save(data) {
        //console.log(data)
        fs.writeFileSync('data.json', JSON.stringify(data))
    },
    load() {
        return JSON.parse(fs.readFileSync('data.json'))
    }
}