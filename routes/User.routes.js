const express = require("express");
const userRouter = express.Router();
const {UserModel} = require("../model/User.model");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

userRouter.post("/register",async(req,res)=>{
const {name,email,pass} = req.body 
try{
//hashing password
bcrypt.hash(pass,5,async(err,hash)=>{
  if(err) res.send({"msg":"Something went wrong","error":err.message})
  else{
    const user = new UserModel({name,email,pass:hash})
    await user.save()
    res.send("New user has been registered")
  }
})

}catch(err){
    res.send({"msg":"Something went wrong","error":err.message})
}   

})


userRouter.post("/login",async(req,res)=>{
    const {email,pass} = req.body
    try{
  const user = await UserModel.find({email})
//   console.log(user)
  if(user.length>0){
    //in jwt we are passing two things first is random payload and second one is token
    bcrypt.compare(pass, user[0].pass ,(err,result)=>{
if(result){
    
    let token = jwt.sign({userID:user[0]._id},"masai")
    res.send({"msg":"Logged in","token":token})
}else{
    res.send({"msg":"Wrong Credentials"})
}
    })
    

  }else{
    res.send({"msg":"Wrong Credentials"})
  }

    }catch(err){
        res.send({"msg":"Something went wrong"})
    }
})

module.exports={
    userRouter
}