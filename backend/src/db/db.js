const mongoose = require('mongoose');

async function DBConnected() {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Database Connected");
    } catch (err) {
        console.log("DB Connection Error:", err);
    }
}

module.exports = DBConnected;