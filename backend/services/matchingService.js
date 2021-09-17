const waitingRoom = require('../model/waitingRoom');

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
    

