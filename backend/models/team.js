const Mongoose = require('mongoose')

const TeamSchema = new Mongoose.Schema({
    name: String,
    players: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    }],
    credits: Number

})

module.exports = Mongoose.model('Team', TeamSchema)