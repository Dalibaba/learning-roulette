const waitingRoom = require('../model/waitingRoom');



/**
 * checks if more than 2 users are present in the waitingroom and starts matching
 */
function checkWaitingRoom() {

    try {
        const usersInWaitingRoom = await waitingRoom.find({
        language: language,
        });
        return usersInWaitingRoom;
    } catch (error) {
        return error;
    }

}

/**
 * match two users from the database from the waitingroom
 */
function matchLearningPartners(language) {

    try {
        const usersInWaitingRoom = await waitingRoom.find({
        language: language,
        });
        return usersInWaitingRoom;
    } catch (error) {
        return error;
    }

}
    

