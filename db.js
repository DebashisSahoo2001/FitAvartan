// const mongoose = require('mongoose');

// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URI, { // Replace with your MongoDB URI
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         });
//         console.log('MongoDB Connected...');
//     } catch (error) {
//         console.error(error);
//         process.exit(1);
//     }
// };

// module.exports = connectDB;
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB Connected...');
    } catch (error) {
        console.error(error);
        process.exit(1); 
    }
};

module.exports = connectDB;

