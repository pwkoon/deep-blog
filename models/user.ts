import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }, 
}, {timestamps: true});

const User = models.User || mongoose.model("User", userSchema) //if user existed, retrieve, else create new user

export default User;