var express = require('express')
var mongoose = require("mongoose");
var bodyParser = require('body-parser')
var cors = require('cors');
var dbConnect = require('./config/db/mlab-config')
// var port = 3000
var port = process.env.PORT || 3000

//var port = process.env.PORT - "process" Node thing, environment, all caps= constant
var server = express();


server.use(cors());

server.use(express.static(__dirname + '/public' )) //    '/../wwww/'
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended:true}))


server.listen(port, ()=>{
  console.log('Listening on port: ', port)
})


//TODO

var musicRouter = require('./routes/music')
server.use('/api/music', musicRouter)
