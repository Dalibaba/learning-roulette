const waitingRoom = require('../model/waitingRoom');

/**
 * match two users from the database from the waitingroom
 * @returns {Array<Object>} List of challanges
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
    

