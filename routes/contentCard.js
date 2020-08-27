const express = require('express');
const { body } = require('express-validator');


const contentCardController = require('../controllers/contentCard');
const CardContent = require('../models/cardContent');

const routes = express.Router();

routes.get('/:url', contentCardController.getContentCard);

routes.post('/',
    [
        body('url', 'URL is required and should be longer than 2 characters.').trim().isLength({ min: 2 }).notEmpty().
            custom((value, { req }) => {
                return CardContent.findOne({ url: value })
                    .then(contentCard => {
                        if (contentCard) {
                            return Promise.reject('Card content already exists with the url: ' + value);
                        }
                    })
            }),

        body('pattern', 'Pattern is required').trim().notEmpty(),

        body('colors','Colors is required.').notEmpty(),

        body('firstName').notEmpty().withMessage('First name is required.').trim().isLength({ min: 2, max: 15 }).withMessage('The length of the first name should be between 2 and 15 characters'),
        
        body('lastName').notEmpty().withMessage('Last name is required.').trim().isLength({ min: 2, max: 20 }).withMessage('The length of the last name should be between 2 and 20 characters'),
        
        body('jobTitle').notEmpty().withMessage('Job title is required.').trim().isLength({ min: 2, max: 25 }).withMessage('The length of the job title should be between 2 and 25 characters'),
        
        body('bio').notEmpty().withMessage('Bio is required.').trim().isLength({ min: 2, max: 500 }).withMessage('The length of the bio should be between 2 and 500 characters'),
        
        body('preferredContactMethod').custom((value, { req }) => {
            if (value === 'phone' || value === 'email' || value === 'facebook' || value === 'whatsapp')
                return true;
            else {
                throw new Error('Preferred contact method should be phone or email or WhatsApp or Facebook only.')
            }
        }),

        body('phone', 'phone is required and the length of the should be 10 digits (number only).').notEmpty().trim().isNumeric().isLength(10),

        body('email', 'email is required').notEmpty().trim().isEmail().withMessage('Invalid email.'),

        body('fontFamily', 'FontFamily is required').notEmpty()
    ],
    contentCardController.postContentCard);

module.exports = routes;