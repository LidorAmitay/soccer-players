const mongoose = require('mongoose');
const Player = require('./models/player');

mongoose.connect('mongodb://localhost:27017/soccerApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connection to Mongoose Open !")
    })
    .catch(err => {
        console.log('Connection to Mongoose Failed !')
        console.log(err);
    })


const data = [
    {
        name:'Lionel Messi',
        age:34,
        role:'Attack',
        position:'RW',
        jersey:10,
    },
    {
        name:'Cristiano Ronaldo',
        team:'Juventus',
        age:36,
        role:'Attack',
        position:'LW',
        jersey:7,
    },
    {
        name:'Gianluigi Donnarumma',
        team:'Paris SG',
        age:22,
        role:'GK',
        position:'GK',
        jersey:50,
    },
    {
        name:'Sergio Ramos',
        team:'Paris SG',
        age:35,
        role:'DEFENCE',
        position:'CB',
        jersey:4,
    },
    {
        name:'Xabi Alonso',
        team:'Retired',
        age:39,
        role:'MIdfield',
        position:'CDM',
        jersey:14,
    },
]

Player.insertMany(data)
    .then(res => {
        console.log(res)
    })
    .catch(e => {
        console.log(e)
    })