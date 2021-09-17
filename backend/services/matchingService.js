const waitingRoom = require('../model/waitingRoom');



/**
 * checks if more than 2 users are present in the waitingroom and starts matching
 */
async function checkWaitingRoom() {
    try {
        const usersInWaitingRoom = await waitingRoom.find();
        return usersInWaitingRoom.length;
    } catch (error) {
        return error;
    }
}

/**
 * match two users from the database from the waitingroom
 */
async function matchLearningPartners(language) {

    console.log("start matching");

}
 
module.exports = {
    checkWaitingRoom,
    matchLearningPartners
  };

