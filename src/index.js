// require('dotenv').config({path: './env'})


import dotenv from "dotenv"
import connectDB from "./db/index.js"



dotenv.config({
    path: './.env'

})

connectDB().then(()=>{
    console.log("MongoDB is connected! ")
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`App is Listening on PORT : ${process.env.PORT}`);
    })
}).catch((error) => {
    console.log("Mongo connection failed: ", error)
    process.exit(1)
})

// import mongoose from "mongoose"
// import {DB_NAME} from "./constants"


// import express from "express"

// const app = express();


// // ifi func , immediately execute
// (async () => {

//     try {
//         await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
//         app.on("Error", (error)=>{
//             console.log("Error: ", error)
//             throw error;
//         }) // for express errors 

//         app.listen(process.env.PORT, ()=>{
//             console.log(`App is Listening on PORT : ${process.env.PORT}`);
//         })


//     } catch (error) {
//         console.log("Error: ", error)
//         throw error;
//     }
// })()