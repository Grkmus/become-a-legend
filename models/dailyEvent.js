const Mongoose = require('mongoose')

const DailyTournamentSchema = new Mongoose.Schema({
    name: String,
    date: Date,
    teams: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    }],
    location: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Location'
    }],
    matches: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Match'
    }],
    attendees: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    }]
})

module.exports = Mongoose.model('DailyEvent', DailyTournamentSchema)
