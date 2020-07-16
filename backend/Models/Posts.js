const mongoose = require("mongoose");
const User = require("./User");
const {ObjectId} =  mongoose.Schema;
const PostsSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    picture:{
        data:Buffer,
        contentType:String
    },
    user:{
        type:ObjectId,
        ref:"User"
    },
    author:{
        type:String
    }
},{timestamps:true})

module.exports = mongoose.model("Posts",PostsSchema);