const dotenv=require("dotenv").config()
const express=require("express")
const app=express()
const port=process.env.PORT
const dbConnect=require("./db")
dbConnect();


app.listen(()=>{
    console.log(`Server is running at ${port}`)
})