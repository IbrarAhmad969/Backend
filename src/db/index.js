import mongoose from "mongoose"

import { DB_NAME } from "../constants.js"

const connectDB = async () => {
    try {
        console.log("🚀 Attempting to connect to MongoDB...");
       const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
       console.log(`\n MongoDB is connected! DB Host ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("Error: ", error)
        process.exit(1)
    }
}

export default connectDB

