const mongoose = require('mongoose');
const { stringify } = require('nodemon/lib/utils');


const playerSchema = new mongoose.Schema({
    name : {
        type: String,
    },
    team : {
        type : String,
        default: 'Free Agent',
    },
    age: {
        type: Number,
    },
    role:{
        type:String,
        enum: ['GK','DEFENCE', 'MIDFIELD', 'ATTACK'],
        uppercase:true,
    },
    position: {
        type: String,
    },
    jersey: {
        type: Number,
    },
})

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;