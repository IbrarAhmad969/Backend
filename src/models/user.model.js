import e from "express";
import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            index: true, // to make search faster, searching field should be indexed...  optimize the search

        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        fullname: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        avatar: {
            type: String, // cloudnary url
            required: true,
            trim: true,
        },
        coverImage: {
            type: String, // cloudnary url
            trim: true,
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Video',
            },
        ],
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        refreshToken: {
            type: String,
        },

    },
    { timestamps: true },
)

userSchema.pre('save', async function (next) { // hook to hash password before saving
    if (this.isModified('password')) { // check if password is modified, only first time it will run, when password is created or updated
        this.password = await bcrypt.hash(this.password, 10) // hash password with 10 rounds
    }
    next() // call the next middleware
})
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password) // compare the password with the hashed password
}
userSchema.methods.generateToken = function () {
    return jwt.sign(
        {
        _id: this._id,
        username: this.username, 
        email: this.email, 
        fullname: this.fullname,
    }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY }) // generate token with user id and secret key
}
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }) // generate refresh token with user id and secret key
}

export const User = mongoose.model('User', userSchema)