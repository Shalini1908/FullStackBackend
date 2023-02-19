const express = require("express");
const app = express();
const connection = require("./db")
const {userRouter} = require("./routes/User.routes")
const {noteRouter} = require("./routes/Notes.routes")
const {authenticate} = require("./middleware/authenticate.middleware")
const cors = require("cors")
require('dotenv').config();


app.use(express.json());
app.use(cors())


app.get("/",(req,res)=>{
 res.send("Welcome to my website")   
})

app.use("/users",userRouter)
app.use(authenticate)
app.use("/notes",noteRouter)

app.listen(process.env.port,async(req,res)=>{
try{
await connection
console.log("Connected to db")

}catch(err){
console.log("Can't connect")
console.log(err)
}
console.log(`Server running at port ${process.env.port}`)    
})