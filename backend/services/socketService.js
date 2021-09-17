const waitingRoom = require('../model/waitingRoom');

/**
 Listens to connected users in the waitingRoom
 * @param {socketio} io
 * @returns {object#} updated invitation
 */
 function socketListener(io) {
//Check socket connection
    io.on('connection', (socket) => { 
        console.log('a user connected');
        var username;
        // Listen for chatMessage
        socket.on('join-waitingroom', async (userinformation) => {
            console.log("joined waiting room")
                // save user to waiting Room
            const newUser = new waitingRoom({
                name: userinformation.name,
                language: userinformation.language,
            });
            try {
                const savedNewUser = await newUser.save();
                username = savedNewUser.name
                console.log("user saved!", savedNewUser.name);
            } catch (error) {
                console.log(error)
            }

        });
        socket.on('disconnect', async () => {
            try {
                const deletedUser = await waitingRoom.findOneAndRemove(
                    { name: username },
                  );
                console.log("user deleted!", deletedUser);
            } catch (error) {
                console.log(error)
            }
        });
    }
    );
}

module.exports = {
    socketListener,
  };