const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardContentSchema = new Schema({
    url: {
        type: String,
        required: true,
    },
    pattern: {
        type: String,
        required: true
    },
    colors: {
        type: String,
        required: true,
        default: 'default colors'
    },
    logoUrl: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: false
    },
    jobTitle: {
        type: String,
        required: true
    },
    location:{
        type: Object,
        required: false
    },
    bio:{
        type:String,
        required: true
    },
    preferredContactMethod:{
        type: String,
        enum: ['phone', 'email', 'whatsapp', 'facebook'],
        required: true,
        default: 'phone'
    },
    phone:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    socialMediaLinks:{
        type:[String],
        required: true,
        default: []
    },
    fontFamily:{
        type:String,
        required:true,
        default: 'Poppins'
    }
}, { timestamps: true })

module.exports = mongoose.model('CardContent', cardContentSchema);