import * as mongoose from "mongoose";

export interface UserCondition {
    _id?: string;
    username?: string;
    password?: string;
}

export interface User extends mongoose.Document {
    username: string;
    password: string;
}

export const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        unique: true,
        required: true
    }
});
