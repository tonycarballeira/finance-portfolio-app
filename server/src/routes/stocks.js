import express from 'express';
import mongoose from 'mongoose';
import { StockModel } from '../models/Stocks.js';
import { UserModel } from '../models/Users.js';

const router = express.Router();

router.get("/", async (req, res) => {
    const user = await UserModel.findById(req.body.userID);

    try {
        const response = await StockModel.find({});
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});

router.post("/", async (req, res) => {
    
    try {
        const user = await UserModel.findById(req.body.userID);
        const stock = new StockModel(req.body);
        const savedStock = await stock.save();
        user.stocksPurchased.push(savedStock);
        await user.save();  
        res.json({stocksPurchased: user.stocksPurchased});
    } catch (err) {
        res.json(err);
    }
})


router.put("/", async (req, res) => {
    const stock = new StockModel(req.body);
    try {
        const response = await stock.save();
        res.json(response);
    } catch (err) {
        res.json(err);
    }
})




export { router as stocksRouter };