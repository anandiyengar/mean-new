const User = require("./../Models/User");

exports.getUserById = (req,res,next,id) => {
 User.findById(id).exec((error,user)=>{
    if(error || !user){
        return res.status(400).json({
            error:"No user found with that id."
        })
    }
    req.profile = user;
    next();
 })
}

exports.getUser = (req,res) => {
    req.profile.salt = undefined;
    req.profile.hashPassword = undefined;
    return res.json(req.profile);
}

exports.updateUser = (req,res) => {
    User.findOneAndUpdate(
        {_id:req.profile._id},
        {$set:req.profile},
        {new:true},
        (error,user)=>{
            if(error){
                return res.status(400).json({
                    error:"Something went wrong!"
                })
            }
            req.profile.hashPassword=undefined;
            req.profile.salt=undefined;
            return res.json(req.profile);
        }
    )
}
