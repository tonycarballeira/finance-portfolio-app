import mongoose from "mongoose";

const StockSchema = new mongoose.Schema({
    name: { type: String, required: true},
    purchasePrice: { type: Number, required: true},
    quantity: { type: Number, required: true},
    userOwner: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true}  
}); 

export const StockModel = mongoose.model("stocks", AssetSchema);