const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const port = 3000;
const engine = require('ejs-mate');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const Player = require('./models/player');
const { playerSchema } = require('./schemas.js');
const Joi = require('joi');

const ExpressError = require('./utils/ExpressError');
const asyncHandler = require('./utils/asyncHandler');

mongoose.connect('mongodb://localhost:27017/soccerApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connection to Mongoose Open !")
    })
    .catch(err => {
        console.log('Connection to Mongoose Failed !')
        console.log(err);
    })

app.engine('ejs', engine); // setting ejs-mate as ejs engine
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(morgan('tiny'))

function validatePlayer(req, res, next) {
    const {error} = playerSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

app.get('/search', asyncHandler(async (req, res) => {
    const {search} = req.query
    const regex = new RegExp(search, 'i')
    const players = await Player.find({name:{$regex: regex}})
    res.render('players/find', {players});
}))

app.get('/players', asyncHandler(async (req, res) => {
    const players = await Player.find({});
    res.render('players/index', {players});
}))

app.get('/players/new', (req, res) => {
    res.render('players/new');
})
app.get('/players/:id/edit', asyncHandler(async (req, res) => {
    const {id} = req.params;
    const player = await Player.findById(id);
    res.render('players/edit', {player});
}))

app.get('/players/:id', asyncHandler(async (req, res, next) => {
    const {id} = req.params;
    const player = await Player.findById(id);
    // if (!player) {
    //     return next(new ExpressError("Player Not Found!", 404));
    // }
    res.render('players/show', {player});
}))

app.post('/players', validatePlayer, asyncHandler(async(req, res) => {
    const playerDetails = req.body.player;
    const newPlayer = new Player(playerDetails);
    await newPlayer.save();
    res.redirect('/players');
}))

app.put('/players/:id', validatePlayer, asyncHandler(async (req, res) => {
    const {id} = req.params;
    const player = await Player.findByIdAndUpdate(id, req.body, {runValidators: true, new: true});
    res.redirect(`/players/${player._id}`);
}))

app.delete('/players/:id', asyncHandler(async (req, res) => {
    const {id} = req.params;
    const player = await Player.findByIdAndDelete(id);
    res.redirect('/players');
}))

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
})

app.use((err, req, res, next) => {
    const {status = 500} = err;
    if (!err.message) err.message = 'Something went wrong';
    res.status(status).render('error', {err});
    // next(err);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })

