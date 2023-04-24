import mongoose from "mongoose";

const StockSchema = new mongoose.Schema({
    name: { type: String, required: true },
    symbol: { type: String, required: true},
    currentPrice: Number,
    quantity: Number,
    value: Number,
    userOwner: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true}  
}); 

export const StockModel = mongoose.model("stocks", StockSchema);