//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express();
const db = mongoose.connection;
const Mangas = require('./models/mangaSchema.js')
const seedData = require('./models/mangaSeed.js')
require('dotenv').config()

//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3003;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;
// const mongoURI = ('mongodb://localhost:3000:27017/mangas')

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI, () => {
    console.log('connected to mongo');
});

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form


//___________________
// Routes
//___________________
//localhost:3000
// app.get('/' , (req, res) => {
//   res.redirect('/manga');
// });

app.get('/manga/seed', (req,res) => {
  seedData.forEach((manga, i) => {
    Mangas.create(seedData[i], (err, data) => {
    });
  });
  res.redirect('/');
});


// app.get('/', (req, res) => {
//   Mangas.find({})
//     .then((data) => {
//       res.send(data)
//     })
// })

app.get('/', (req, res) => {
    Mangas.find({}, (err, mangaData) => {
      console.log(mangaData);
        res.render('index.ejs', {
          data: mangaData,
        });
    });
});


app.get('/new', (req, res) => {
    res.render('new.ejs', {});
});


app.get('/:id', (req, res) => {
    Mangas.findById({_id: req.params.id}, (err, showData)=>{
      console.log(showData);
        res.render('show.ejs', {data: showData});
    });
});


app.get('/:id/edit', (req, res) => {
    Mangas.find({_id: req.params.id}, (err, editData)=>{
        res.render('edit.ejs', {data: editData});
    });
});


app.post('/', (req, res) => {
    Mangas.create(req.body, (err, createManga) => {
        res.redirect('/')
    });
});


app.put('/:id', (req, res) => {
    Mangas.findOneAndUpdate({_id: req.params.id}, req.body, {new:true}, (err, updateManga) => {
      if (err) {}
        res.redirect('/')
    });
});
//
//
app.delete('/:id' , (req, res) => {
    Mangas.findByIdAndDelete({_id: req.params.id}, (err, data) => {
        res.redirect('/');
    });
});

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));
