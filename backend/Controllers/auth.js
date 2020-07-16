const User = require("./../Models/User");
const { validationResult, cookie } = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
exports.registerUser = (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            error:errors.array()[0].msg
        })
    }
    const user = new User(req.body);
    user.save((error,user)=>{
        if(error){
            return res.status(400).json({
                error:"Account with same email already exist."
            });
        }
        user.hashPassword = undefined;
        user.salt = undefined;
        return res.status(200).json(user);
    })
}

exports.loginUser = (req,res) => {
    const {email,password} = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            error:errors.array()[0].msg
        })
    }
    User.findOne({email:email},(error,user)=>{
        if(error || !user){
            return res.status(400).json({
                error:"No account with that email found!"
            })
        }
        if(!user.authentication(password)){
            return res.status(400).json({
                error:"Sorry! password does not match the account."
            })
        }
        const token = jwt.sign({id:user._id},"SECRETKEYANAND");
        res.cookie("token",token,{expiry:new Date()+9999});

        const {_id,email,name,dob} = user;
        res.json({
            token,
            user:{_id,email,name,dob}
        })
    })
}

exports.logoutUser = (req,res) => {
    res.clearCookie("token");
    res.status(200).json({
        message:"Signout has been successful"
    })
}

exports.isLoggedIn = expressJwt({
    secret:"SECRETKEYANAND",
    userProperty:"auth",
    algorithms: ['HS256']
})

exports.isAuthenticated = (req,res,next) => {
    const check_auth = req.profile && req.auth && req.profile._id == req.auth.id;
    if(!check_auth){
        return res.status(400).json({
            error:"Unauthorize User detected.",
            profile:req.profile,
            auth:req.auth
        });
    }
    next();
}
