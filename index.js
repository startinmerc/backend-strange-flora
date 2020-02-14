// ==================Env Variables==================

const PORT = 8081;
require("dotenv").config();

// ==================Dependencies==================

const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./handlers/error");



// =================Express Config=================

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// ===================Auth Routes===================

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// =================Error Handlers=================

app.use((req,res,next)=>{
	let err = new Error("Not Found");
	err.status = 404;
	next(err);
});

app.use(errorHandler);


// ===================Start App===================

app.listen(PORT, function(){
	console.log(`Server running on port ${PORT}`);
});
