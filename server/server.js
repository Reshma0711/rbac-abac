const dotenv=require("dotenv").config()
const express=require("express")
const app=express()
const port=process.env.PORT
const dbConnect=require("./db")
dbConnect();
const projectRoutes=require("./routes/project")
const errorHandler = require("./middlewares/errorHandler")
app.use(express.json())


app.use("/projects",projectRoutes)

app.use(errorHandler)

app.listen(port,()=>{
    console.log(`Server is running on ${port}`)
})