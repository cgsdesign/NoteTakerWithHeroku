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
const {notes} = require('./db/db');
const { type } = require('os');
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

function validateNote(notes) {
    if (!notes.title || typeof notes.title !== 'string') {
        return false;
    }
    if (!notes.text || typeof notes.text !== 'string') {
        return false;
    }
    return true
}

function createNewNote(body, notesArray) {
    const note = body
    notesArray.push(note)
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),//join new note to director array
        JSON.stringify({ notes: notesArray}, null, 2)//save JS array as JSON, null eans dont ess with current data, and 2 adds a space between existing data and new note for orginization
    )
    console.log(note + "saved")
    return note
}
//.post - note /api/notes references url and ties into when called in functionin index
//--ASK KEVIN TO EXPLAIN!!!!! HOW DOES THE INDEX KNOW WHAT .POST TO GRAB AND DO LAST CHAPTER
app.post('/api/notes', (req,res) => {
    req.body.id = notes.length.toString()//FOR NOW ONLY

    // if (!validateNote(req.body)){
    //     res.status(400).send('note has a blank section')
    // }
    // else {
        const note = createNewNote(req.body, notes)
        res.json(note)
    // }

})

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