const Match = require('./match')
const Mongoose = require('mongoose')

const PlayerSchema = new Mongoose.Schema({
    name: String,
    surname: String,
    email: String,
    imageURL: String,
    age: Number,
    weight: Number,
    height: Number,
    location: String,
    telephone: String,
    ratingsByOwn: {
        power: Number,
        speed: Number,
        stamina: Number,
        handling: Number,
        offense: Number,
        defense: Number,
        teamplay: Number,
        individualSkill: Number,
    },
    ratingEvaluation: Number,
    credit: Number,
    rolePreference: Array
})

module.exports = Mongoose.model('Player', PlayerSchema)
