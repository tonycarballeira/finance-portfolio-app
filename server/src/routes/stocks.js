import express from 'express';
import mongoose from 'mongoose';
import { StockModel } from '../models/Stocks.js';


const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const response = await StockModel.find({});
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});

router.post("/", async (req, res) => {
    const stock = new StockModel(req.body);
    try {
        const response = await stock.save();
        res.json(response);
    } catch (err) {
        res.json(err);
    }
})



export { router as stocksRouter };