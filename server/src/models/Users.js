import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    stocksPurchased: [{type: mongoose.Schema.Types.ObjectId, ref: "stocks"}],
    watchList: [ {name: String } ]
}); 

export const UserModel = mongoose.model("users", UserSchema);