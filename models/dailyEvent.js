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
    phase: { type: String, default: 'phase1' },
    turn: { type: Number, default: 0 }
})

module.exports = Mongoose.model('DailyEvent', DailyEventSchema)
