const waitingRoom = require('../model/waitingRoom');

/**
 Listens to connected users in the waitingRoom
 * @param {socketio} io
 */
 function socketListener(io) {
//Check socket connection
    io.on('connection', (socket) => { 
        console.log('a user connected');
        var username;
        // Listen for joining waitingroom
        socket.on('join-waitingroom', async (userinformation) => {
            // save user to waitingroom
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

        //TODO delete, if user goes back to main page
    }
    );
}

module.exports = {
    socketListener,
  };