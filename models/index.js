// Import .env
require('dotenv').config();

// Import & config mongoose
const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;

// Clear mongoose warnings
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect("mongodb+srv://STM:"+process.env.STM+"@cluster0-c9k9l.mongodb.net/strange-flora?retryWrites=true&w=majority" || "mongodb://localhost:27017/strange-flora", {
	keepAlive: true
});

// Connect schemas
module.exports.User = require("./user");
module.exports.Review = require("./review");
module.exports.Product = require("./product");
module.exports.Category = require("./category");
module.exports.LandingSection = require("./landingSection");
module.exports.Delivery = require("./delivery");
