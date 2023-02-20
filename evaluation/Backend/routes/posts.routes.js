const express = require("express");
const { PostModel } = require("../models/post.schema");


const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const postRouter = express.Router()

postRouter.get("/",async(req,res)=>{
    const posts=await PostModel.find();
    res.send(posts);
})

postRouter.post("/create",async(req,res)=>{
    const payload=req.body;
    const posts=new PostModel(payload);
    await posts.save();
    res.send({"msg":"posts are created"});
})

postRouter.delete("/delete/:id",async(req,res)=>{
      const postID=req.params.id;
      const post=await PostModel.findOne({"_id":postID});
      const userID_post=post.userID;
      const userID_req=req.body.userID;
      try {
        if(userID_req!==userID_post){
            res.send("YOu are not authorized");
        }else{
        await PostModel.findByIdAndDelete({_id:postID});
        res.send({"msg":`post has been deleted ${postID} `})
        }
      } catch (error) {
        res.send({ "msg": "New user unable to deleted", "err": err.message });
      }
})

postRouter.patch("/update/:id",async(req,res)=>{
    const postID=req.params.id;
    const post=await PostModel.findOne({"_id":postID});
    const userID_post=post.userID;
    const userID_req=req.body.userID;
    try {
      if(userID_req!==userID_post){
          res.send("YOu are not authorized");
      }else{
      await PostModel.findByIdAndUpdate({_id:postID});
      res.send({"msg":`post has been updated ${postID} `})
      }
    } catch (error) {
      res.send({ "msg": "New user unable to updated", "err": err.message });
    }
})




module.exports={postRouter};