    import express from "express";
    import cors from "cors";
    import mongoose from "mongoose";

    import { userRouter } from "./routes/users.js";
    import { stocksRouter } from "./routes/stocks.js";

    const app = express();

    app.use(express.json());
    app.use(cors());
    app.use("/auth", userRouter);
    app.use("/stocks", stocksRouter);

    mongoose.connect(
        "mongodb+srv://tonycarballeira:theduke23@financialportfolioapp.l8khwfp.mongodb.net/FinancialPortfolioApp?retryWrites=true&w=majority"
    );

    app.listen(3001, () => console.log("SERVER STARTED"));