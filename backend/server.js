const express = require("express");
const app = express()
//create server based on express server
const server = require('http').Server(app)
//pass server to socketio
const socketio = require('socket.io')(server)

//view engine
app.set('view engine', 'ejs')

server.listen(3000)