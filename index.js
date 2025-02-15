import express from "express";
import cors from "cors";
import { dbConnect } from "./config/db/dbConnect.js";
import authRouter from "./routes/auth.route.js";
import getBalanceRouter from "./routes/getBalance.route.js";
import cookieParser from "cookie-parser";
import transactionRouter from "./routes/transactions.route.js";
import swaggerUi from 'swagger-ui-express';
import { specs } from './swaggerConfig.js';
import dotenv from 'dotenv'

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// API routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/account', getBalanceRouter);
app.use('/api/v1/txn', transactionRouter);

// Serve Swagger UI at root
app.use('/', swaggerUi.serve);
app.get('/', swaggerUi.setup(specs));

dbConnect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.log('FAILED TO START SERVER : ', error);
    process.exit(1)
  })