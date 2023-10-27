const express=require("express");
const { Connection } = require("./config/db");
const {parkingRouter} = require('./routes/parking.route')
require("dotenv").config()

const app = express()

const PORT = process.env.PORT || 8000;

app.use(express.json());


app.use("/api",parkingRouter)

app.listen(PORT,async()=>{
    try {
        await Connection
        console.log("Connected to DB")
    } catch (error) {
        console.log("Error in connecting to DB")   
    }
    console.log(`Server running @ ${PORT}`)
})