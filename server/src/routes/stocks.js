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

router.post("/new", async (req, res) => {  
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
});


router.put("/buy", async (req, res) => {
    const price = req.body.price;
    const quantity = req.body.quantity;

    try {
        const stock = await StockModel.findOne({userOwner: req.body.userID, name: req.body.name});
        stock.purchases.push({price: price, quantity: quantity});
        await stock.save();
        res.json({stock});
    } catch (err) {
        res.json(err);
    }
});

router.put("/sell", async (req, res) => {
    const price = req.body.price;
    const quantity = req.body.quantity;

    try {
        const stock = await StockModel.findOne({userOwner: req.body.userID, name: req.body.name});
        stock.sales.push({price: price, quantity: quantity});
        await stock.save();
        res.json({stock});
    } catch (err) {
        res.json(err);
    }
});




export { router as stocksRouter };