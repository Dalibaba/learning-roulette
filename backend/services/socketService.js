const waitingRoom = require('../model/waitingRoom');
const matchingService = require('./matchingService');
/**
 Listens to connected users in the waitingRoom
 * @param {socketio} io
 */
 function socketListener(io) {
//Check socket connection
    io.on('connection', (socket) => { 
        console.log('a user connected');
        var username;
        var date = Date.now()
        // Listen for joining waitingroom
        socket.on('join-waitingroom', async (userinformation) => {
            // save user to waitingroom
            const newUser = new waitingRoom({
                name: userinformation.name,
                language: userinformation.language,
                date: date
            });
            try {
                const savedNewUser = await newUser.save();
                username = savedNewUser.name
                console.log("user saved!", savedNewUser.name);
                
            } catch (error) {
                console.log(error)
                // TODO redirect to main page, problem on our side
            }
            // get amount of waiting users in waiting room
            var amountOfWaitingUsers = await matchingService.checkWaitingRoom(); 
            if (amountOfWaitingUsers > 2) {
                matchingService.matchLearningPartners()
            }
              
        });
        socket.on('disconnect', async () => {
            try {
                const deletedUser = await waitingRoom.findOneAndRemove(
                    { name: username },
                  );
            } catch (error) {
                console.log(error)
            }
        });

        //TODO delete, if user goes back to main page
        //TODO delete from waiting room automatically if more than 10 Minutes passed
    }
    );
}

module.exports = {
    socketListener,
  };