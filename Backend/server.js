import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import ChatRoutes from "./Routes/Chats.js"


dotenv.config();

const port=8080;

const app =  express();

app.use(express.json())
app.use(cors())

app.use("/api",ChatRoutes)



app.listen(port,()=>{
  console.log(`Server is listening on port : ${port}`)
  ConnectDB()
})


const ConnectDB = async () => {
  
  try{
    await mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
      console.log(`Database Connected Successfully`)
    })
  }
  catch(err){
    console.log(`Error While Connecting to database : ${err}`)
  }
}



