const Mongoose = require('mongoose')

const DailyEventSchema = new Mongoose.Schema({
    name: String,
    date: Date,
    teams: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    }],
    location: String,
    matches: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Match'
    }],
    attendees: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    }],
    attendeesToBeSelected: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    }],
    phase: String
})

module.exports = Mongoose.model('DailyEvent', DailyEventSchema)
