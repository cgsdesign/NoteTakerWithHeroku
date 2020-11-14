// npm init -y  then npm i express to install express (npm init -y) stands for implicit yes to all prompts
// git add -A
// git commit -m "Add Heroku"
// git push heroku feature/MVP:main = to bypass heroku not willing to go to anything not main
// NOTE branch MUST be commited first indempendantly or this wont work. 
//to see life site, comand line heroku open
// to run with animals  https://shrouded-castle-54418.herokuapp.com/api/animals
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