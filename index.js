const express=require("express");
const { Connection } = require("./config/db");
require("dotenv").config()

const app = express()

const PORT = process.env.PORT || 8000;

app.use(express.json());

app.listen(PORT,async()=>{
    try {
        await Connection
        console.log("Connected to DB")
    } catch (error) {
        console.log("Error in connecting to DB")   
    }
    console.log(`Server running @ ${PORT}`)
})