const PORT = 8081;

require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./handlers/error");


// Express Config
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// Start App
app.listen(PORT, function(){
	console.log(`Server running on port ${PORT}`);
});