import mongoose from "mongoose";

const StockSchema = new mongoose.Schema({
    name: { type: String, required: true },
    purchases: [{ 
        created: { type: Date, default: Date.now},
        price: Number,
        quantity: Number 
    }],
    sales: [{ 
        created: { type: Date, default: Date.now},
        price: Number,
        quantity: Number 
    }],
    userOwner: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true}  
}); 

export const StockModel = mongoose.model("stocks", StockSchema);