const mongoose = require('mongoose');
const { stringify } = require('nodemon/lib/utils');


const playerSchema = new mongoose.Schema({
    name : {
        type: String,
        required:true,
    },
    team : {
        type : String,
        default: 'Free Agent',
    },
    age: {
        type: Number,
        required : true,
    },
    role:{
        type:String,
        enum: ['GK','DEFENCE', 'MIDFIELD', 'ATTACK'],
        uppercase:true,
    },
    position: {
        type: String,
        required:true,
    },
    jersey: {
        type: Number,
        required: true,
    },
})

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;