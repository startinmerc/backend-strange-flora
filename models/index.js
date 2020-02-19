// Import & config mongoose
const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;

// Clear mongoose warnings
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect("mongodb://localhost/strange-flora", {
	keepAlive: true
});

// Connect schemas
module.exports.User = require("./user");
module.exports.Review = require("./review");
module.exports.Product = require("./product");
module.exports.Category = require("./category");
module.exports.LandingSection = require("./landingSection");
