    import express from "express";
    import cors from "cors";
    import mongoose from "mongoose";

    const app = express();

    app.use(express.json());
    app.use(cors());

    mongoose.connect(
        "mongodb+srv://tonycarballeira:theduke23@financialportfolioapp.l8khwfp.mongodb.net/FinancialPortfolioApp?retryWrites=true&w=majority"
    );

    app.listen(3001, () => console.log("SERVER STARTED"));