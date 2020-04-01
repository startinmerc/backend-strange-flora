// ==================Env Variables==================

const PORT = 8081;
require("dotenv").config();

// ==================Dependencies==================

const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./handlers/error");

// ===================Middleware===================

const { loginRequired, ensureCorrectUser } = require("./middleware/auth");

// =================Express Config=================

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// ===================Auth Routes===================

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// ==================Review Routes==================

const reviewRoutes = require("./routes/reviews");
app.use(
	"/api/users/:id/reviews",
	loginRequired,
	ensureCorrectUser,
	 reviewRoutes
 );

// =================Product Routes=================

const productRoutes = require("./routes/products");
app.use("/api/products", productRoutes);

// =================Category Routes=================

const categoryRoutes = require("./routes/categories");
app.use("/api/categories", categoryRoutes);

// ==============LandingSection Routes==============

const landingSectionRoutes = require("./routes/landingSections");
app.use("/api/landingSections", landingSectionRoutes);

// =================Error Handlers=================

app.use((req,res,next)=>{
	let err = new Error("Not Found");
	err.status = 404;
	next(err);
});

app.use(errorHandler);


// ===================Start App===================

// const seedDB = require("./seeds");
// seedDB();

app.listen(PORT, function(){
	console.log(`Server running on port ${PORT}`);
});
