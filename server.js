// npm init -y  then npm i express to install express (npm init -y) stands for implicit yes to all prompts
// heroku create
// git add -A
// git commit -m "Add Heroku"
// git push heroku feature/MVP:main = to bypass heroku not willing to go to anything not main
// NOTE branch MUST be commited first indempendantly or this wont work. 
//to see life site, comand line heroku open
// https://notetakerwithheroku.herokuapp.com/.....
//local :   http://localhost:3001/
// npm install
// npm  init express
//npm init y
//will have to run servers each time
//node server.js - this is how we run the code so we can see it on the server. The http will be http://localhost:PORTNUMBER/DATA/QUALIFIERS
//fetch() is the front end API equvalent to app.get

 const fs = require('fs');
 const path = require('path');
//bove is needed to make editing our database file possible
const express = require('express')
const {notes} = require('./db/db')
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.static('public'));//links all front end files in to live page client side


//only links notes (for testing)---------------------------------------------------------
app.get('/api/notes', (req, res) => {
    res.json(notes);
  });
//----------------------------------------------------------//
//------STARTING GET REQUESTS (fetch from API)-------------//
//--------------------------------------------------------//

function findById(id, notesArray) {
    const result = notesArray.filter(notes => notes.id === id)[0];//NOTE: willhave to add something in case of notes deleted
    return result;
  }

app.get('/api/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);//findByID for single search paramater
    if (result) {
      res.json(result);
    } else {
      res.send(404);//IF NO NOTE/Can't find
    }
});


//-------------------------------------------//
//------STARTING POST REQUESTS--------------//
//-----------------------------------------//


//---------------------------------------------------//
//-----STARTING CODE TO CONNECT WITH LIVE PAGE------//
//-------------------------------------------------//
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });
  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  });

//liveify me!---------------------------------------------------------
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });