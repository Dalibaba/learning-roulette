/**
 * Sets a user in the waiting Room
 * Method: POST
 * @param  {string} name
 * @param  {string} language
 * @returns {Object} Created user
 */

// Define globals
const express = require("express");
const {body} = require('express-validator');
const {validationResult} = require('express-validator');
const router = express.Router();
const waitingRoom = require('../model/waitingRoom');

router.post(
    '/waitingroom',
   body('name').isString().isLength({ min: 4, max: 255 }),
   body('language').isString().isLength({ min: 4, max: 255 }),
    async (request, response) => {
      // Find validation errors and wrap them in an object
     const errors = validationResult(request);
      if (!errors.isEmpty()) {
        console.log(errors)
        return response.status(400).json({
          errors: errors.array(),
        });
      }
  
    // save user to waiting Room
    const newUser = new waitingRoom({
        name: request.body.name,
        language: request.body.language,
      });


      try {
        const savedNewUser = await newUser.save();
        return response.json(savedNewUser);
      } catch (error) {
        return response.status(400).json(error);
      }
    }
  );

  module.exports = router;