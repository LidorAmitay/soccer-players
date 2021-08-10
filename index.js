const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const methodOverride = require('method-override');
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

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/players', async (req, res) => {
    const players = await Player.find({});
    res.render('players/index', {players});
})
app.get('/players/new', (req, res) => {
    res.render('players/new');
})
app.get('/players/:id/edit', async (req, res) => {
    const {id} = req.params;
    const player = await Player.findById(id);
    res.render('players/edit', {player});
})
app.get('/players/:id', async (req, res) => {
    const {id} = req.params;
    const player = await Player.findById(id);
    res.render('players/show', {player});
})
app.post('/players', async(req, res) => {
    const details = req.body;
    const newPlayer = new Player(details);
    await newPlayer.save();
    res.redirect('/players');
})
app.put('/players/:id', async (req, res) => {
    const {id} = req.params;
    const player = await Player.findByIdAndUpdate(id, req.body, {runValidators: true, new: true});
    res.redirect(`/players/${player._id}`);
})
app.delete('/players/:id', async (req, res) => {
    const {id} = req.params;
    const player = await Player.findByIdAndDelete(id);
    res.redirect('/players');
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })

