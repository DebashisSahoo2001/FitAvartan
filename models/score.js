const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
    nameWorkout: { 
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true 
    },
    repetition: {
        type: Number,
        required: true
    },
    date: { 
        type: Date, 
        default: Date.now
    },
    // For linking to a user if you have authentication
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Assuming you have a 'User' model
    }
});

const Score = mongoose.model('Score', scoreSchema);
module.exports = Score;
