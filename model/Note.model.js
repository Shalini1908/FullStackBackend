const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
title:String,
body:String,
userID:String  

})

const NoteModel = mongoose.model("notes",noteSchema);

module.exports={
    NoteModel
}


