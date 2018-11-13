const Mongoose = require('mongoose')

const MatchSchema = new Mongoose.Schema({
    teams: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    }]
})

module.exports = Mongoose.model('Match', MatchSchema)