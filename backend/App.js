const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");

// IMPORT ALL THE REQUIRED LIBRARIES
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoute = require("./Routers/auth");
const userRoute = require("./Routers/user");
const postRoute = require("./Routers/posts");
const hobbyRoute = require("./Routers/hobby");

// CONNECT MONGOOSE 
mongoose.connect("mongodb+srv://anandiyengar1993:Anand@1993@cluster0.iyflr.mongodb.net/blog-app",{
    useCreateIndex:true,
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then((res)=>{
    console.log("MONGODB DATABASE HAS BEEN CONNECTED.");
}).catch((err)=>{
    console.log("SOMETHING WRONG WITH DB CONNECTION.");
})

// USE THE ABOVE LIBRARIES IN EXPRESS
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// APP ROUTER
app.use("/api",authRoute);
app.use("/api",userRoute);
app.use("/api",postRoute);
app.use("/api",hobbyRoute);

// RUN THE SERVER
app.listen(port,(req,res)=>{
    console.log(`APP HAS BEEN UP AND RUNNING ON PORT NO. ${port}`);
})