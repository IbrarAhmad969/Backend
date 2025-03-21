
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app = express()


app.use(cors(
    {
        origin: process.env.CORSE_ORIGIN,
        credentials: true
    }
))
app.use(express.json(
    {
        limit: "30kb"
    }
))
app.use(express.urlencoded({ extended: true, limit: "30kb" })) // for form data and url encoded data
app.use(express.static("public")) // for static files, and configure the path to the folder
app.use(cookieParser()) // for parsing cookies secure them with cookie-parser

export { app }