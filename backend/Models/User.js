const mongoose = require("mongoose");
const {v4:uuidv4} = require("uuid");
const { timeStamp } = require("console");
const crypto = require("crypto");
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    hashPassword:{
        type:String,
        required:true
    },
    DOB:{
        type:String,
        required:true
    },
    salt:{
        type:String
    }
},{timestamps:true}
)

// CREATE VIRTUAL PASSWORD

UserSchema.virtual("password")
    .set(function(pass){
        this._password = pass,
        this.salt = uuidv4(),
        this.hashPassword = this.encryptThePassword(pass)
    })
    .get(function(){
        return this._password;
    })

UserSchema.methods={
    authentication: function(passWord){
        return this.encryptThePassword(passWord) == this.hashPassword;
    },
    encryptThePassword: function(passWord){
        if(passWord==''){
            return "";
        }
        try{
            return crypto.Hmac("SHA256",this.salt)
                     .update(passWord)
                     .digest("hex")
        }
        catch(err){
            return "";
        }
    }
}

module.exports = mongoose.model("User",UserSchema);