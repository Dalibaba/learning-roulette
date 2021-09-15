const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv")
const app = express()
const cors = require('cors');

// Import routes
//import rouletteRoute from './route/roulette';
const waitingRoomRoute = require('./route/waitingRoom')

//create server based on express server
const server = require('http').Server(app)
//pass server to socketio
const io = require('socket.io')(server)
// create individual uuid
const {v4: uuidV4} = require('uuid')

//dotenv
dotenv.config();

//middleware , enable CORS
app.use(cors());
app.use(express.json());

//view engine
app.set('view engine', 'ejs')
//set up static folder
app.use(express.static('public'))

// routes
app.use('/api/v1', waitingRoomRoute);


//create new room
app.get('/', (req, res) => {
    //create dynamic url for room
    res.redirect(`/${uuidV4()}`)
}
)

app.get('/:room', (req, res) => {
    res.render('room', {roomId: req.params.room})
}
)

io.on('connection', socket => {
    socket.on('join-room', (roomId, userId) => {
        console.log(roomId, userId)

        // join new room with current user
        socket.join(roomId)
        // send message to the room (to everybody who is in)
        console.log("rommId", roomId)
        socket.broadcast.to(roomId).emit('user-connected', userId)
        
        socket.on('disconnect', () => {
            socket.broadcast.to(roomId).emit('user-disconnected', userId)

        })
    }
    )
})


mongoose.connect("mongodb://localhost:27017/learning-roulette", {
}).then(()=> console.log("MongoDB Connected"))
.catch((err => console.log(err)));

const db = mongoose.connection;

db.once('open', () => {
    /* eslint-disable-next-line */
    console.log('Successfully connected to database!');
  });

// Start server
server.listen(process.env.SERVER_PORT, () => {
    console.log(`API server running on port ${process.env.SERVER_PORT}`);
  });