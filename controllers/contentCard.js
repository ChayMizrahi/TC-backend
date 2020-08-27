const { validationResult } = require('express-validator');
const CardContent = require('../models/cardContent');

/**
 * Gets a contentCard by url.
 */
exports.getContentCard = (req, res, next) => {
    const contentCard_url = req.params.url;

    CardContent.findOne({ url: contentCard_url })
        .then(contentCard => {
            if (!contentCard) {
                const error = new Error('There is no contentCard with the URL: ' + contentCard_url);
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({
                contentCard: contentCard
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })

    console.log(contentCard_url);
};

/**
 * Creates new contentCard.
 */
exports.postContentCard = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        let errorMassage = `One or more fields are invalid:`;
        for (let i = 0; i < errors.array().length; i++) {
            errorMassage = errorMassage + '\n' + errors.array()[i].msg;
        }
        const error = new Error(errorMassage);
        error.statusCode = 422;
        throw error;
    }

    if (!req.file) {
        const error = new Error('Logo / Profile image is required');
        error.statusCode = 422;
        throw error;
    }

    const n_url = req.body.url;
    const n_pattern = req.body.pattern;
    const n_colors = req.body.colors;
    const n_logoUrl = req.file.location;
    const n_firstName = req.body.firstName;
    const n_lastName = req.body.lastName;
    const n_jobTitle = req.body.jobTitle;
    const n_location = req.body.location;
    const n_bio = req.body.bio;
    const n_preferredContactMethod = req.body.preferredContactMethod;
    const n_phone = req.body.phone;
    const n_email = req.body.email;
    const n_socialMediaLinks = req.body.socialMediaLinks;
    const n_fontFamily = req.body.fontFamily;

    const newCardContent = new CardContent({
        url: n_url,
        pattern: n_pattern,
        colors: n_colors,
        logoUrl: n_logoUrl,
        firstName: n_firstName,
        lastName: n_lastName,
        jobTitle: n_jobTitle,
        location: n_location,
        bio: n_bio,
        preferredContactMethod: n_preferredContactMethod,
        phone: n_phone,
        email: n_email,
        socialMediaLinks: n_socialMediaLinks,
        fontFamily: n_fontFamily
    });

    newCardContent.save()
        .then(result => {
            res.status(201).json({
                massage: 'Content card create succsfully.',
                contentCard: result
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}