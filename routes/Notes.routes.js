const express = require("express");
const {NoteModel} = require("../model/Note.model")
const jwt = require("jsonwebtoken")

const noteRouter = express.Router();

noteRouter.get("/",async(req,res)=>{
    const token = req.headers.authorization
    if(token){
     jwt.verify(token,"masai",async (err,decoded)=>{
      const Id = decoded.userID; 
      console.log(Id)
      const notes = await NoteModel.find({userID:Id})
      res.send(notes) 
     })  
  
    }
    else{
        res.send("Please Login")
     } 
 
})

noteRouter.post("/create",async(req,res)=>{
    const payload = req.body
    console.log(payload)
    try{
        const note=  new NoteModel(payload)
        await note.save()
        res.send({"msg":"notes created"})

    }catch(err){
console.log(err)
res.send({"msg":"Can't add"})
    }
  

})


// noteRouter.delete("/delete/:id",async(req,res)=>{
//     const noteId = req.params.id 
//     await NoteModel.findByIdAndDelete({_id:noteId})
//     res.send({"msg":`Note with id ${noteId} has been deleted`})
// })


// noteRouter.patch("/update/:id",async(req,res)=>{
//     const noteId = req.params.id 
//     await NoteModel.findByIdAndUpdate({_id:noteId})
//     res.send({"msg":`Note with id ${noteId} has been updated`})
// })

noteRouter.delete("/delete/:id",async(req,res)=>{
    const id = req.params.id
    const note = await NoteModel.findOne({"_id":id})
    const userID_in_note=note.userID
    const userID_making_req=req.body.userID
    try{
       if(userID_making_req!==userID_in_note){
           res.send({"msg":"You are not authorized"})
       }else{
           await NoteModel.findByIdAndDelete({"_id":id})
           res.send("Deleted the note")
       }
    
    }catch(err){
       console.log(err)
       res.send({"msg":"Something went wrong"})
    }
})


noteRouter.patch("/update/:id", async(req,res)=>{
 const payload = req.body
 const id = req.params.id
 const note = await NoteModel.findOne({"_id":id})
 const userID_in_note=note.userID
 const userID_making_req=req.body.userID
 try{
    if(userID_making_req!==userID_in_note){
        res.send({"msg":"You are not authorized"})
    }else{
        await NoteModel.findByIdAndUpdate({"_id":id},payload)
        res.send("Updated the note")
    }
 
 }catch(err){
    console.log(err)
    res.send({"msg":"Something went wrong"})
 }
 
})



module.exports={
    noteRouter
}