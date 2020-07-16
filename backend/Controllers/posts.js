const User = require("./../Models/User");
const Posts = require("./../Models/Posts");
const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");
const { validationResult } = require("express-validator");
const csv=require('csvtojson')
exports.getPostById = (req,res,next,id) => {
    Posts.findById(id).exec((error,post)=>{
        if(error){
            return res.status(400).json({
                error:"Something went wrong!"
            })
        }
        req.post = post;
        next();
    })
}

exports.getPost = (req,res) => {
    return res.status(200).json(req.post);
}

exports.getAllPosts = (req,res) => {
    Posts.find().exec((error,post)=>{
        if(error){
            return res.status(400).json({
                error:"Something went wrong!"
            })
        }
        return res.json(post)
    })
}

exports.getMyPosts = (req,res) => {
    const r_id = req.profile._id
    Posts.find({user:r_id}).exec((error,post)=>{
        if(error){
            return res.status(400).json({
                error:"Something went wrong!"
            })
        }
        return res.json(post)
    })
}

exports.createPost = (req,res) => {
    let forms = new formidable.IncomingForm();
    forms.keepExtensions=true;
    forms.parse(req,(error,fields,file)=>{
        if(error){
            return res.status(400).json({
                error:"Something went wrong!"
            })
        }
        console.log("inside")
        const {title,description} = fields;
        if(!title || !description){
            return res.status(400).json({
                error:"Title & description fields are required!"
            })
        }

        const posts = new Posts(fields);
        if(file.picture){
            if(file.picture.size > 4*1024*1024){
                return res.status(400).json({
                    error:"Image size is too huge!"
                })
            }
        }

        posts.picture.data = fs.readFileSync(file.picture.path);
        posts.picture.contentType = file.picture.type;
        posts.user = req.profile;
        posts.author = req.profile.name;
        posts.save((error,post)=>{
            if(error){
                return res.status(400).json({
                    error:"Something went wrong!"
                })
            }
            return res.status(200).json(post);
        })
    }) 

}

exports.photo = (req, res, next) => {
    if (req.post.picture.data) {
      res.set("Content-Type", req.post.picture.contentType);
      return res.send(req.post.picture.data);
    }
    next();
  };

exports.updatePost = (req,res) => {
    let forms = new formidable.IncomingForm();
    forms.keepExtensions = true;
    forms.parse(req,(error,fields,file)=>{
        if(error){
            return res.status(400).json({
                error: "Something went wrong e1!"
            })

        }

        
        let posts = req.post;
        posts = _.extend(posts, fields);
        
        if(file.picture){
            if(file.picture.size>4*1024*1024){
                return res.status(400).json({
                    error: "Image is too huge!"
                })
            }
            
       posts.picture.data = fs.readFileSync(file.picture.path);
       posts.picture.contentType = file.picture.type;
       }


       posts.save((error,post)=>{
           if(error){
               return res.status(400).json({
                   error:"Something went wrong! e2"
               })
           }
           return res.status(200).json(post);
       })
    })

}

exports.delPost = (req,res) => {
    const posts = req.post;
    posts.remove((error,post)=>{
        if(error){
            res.status(400).json({
                error:"Something went wrong!"
            })
        }
        return res.status(200).json({
            message:"Post has been deleted."
        })
    })
}

exports.csv = (req,res) => {
    let form = new formidable.IncomingForm();
    form.parse(req,(error,fields,file)=>{
        const csvFilePath=file.picture.path
csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
    res.json(jsonObj)
    console.log(jsonObj);
    /**
     * [
     *  {a:"1", b:"2", c:"3"},
     *  {a:"4", b:"5". c:"6"}
     * ]
     */ 
})
    })
}