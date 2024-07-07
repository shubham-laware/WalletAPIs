import { Router } from "express";
import authenticate from "../middleware/authenticate.js";
import transferTx from "../controller/transaction/transfer.js";
import depositTx from "../controller/transaction/deposit.js";
import withdrawTx from "../controller/transaction/withdraw.js";
import getTransactionHistory from "../controller/getTransactionHistory.js";

const transactionRouter = Router();

/**
 * @swagger
 * /txn/deposit:
 *   post:
 *     summary: Deposit funds
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *             properties:
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Deposit successful
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
transactionRouter.post('/deposit', authenticate, depositTx);

/**
 * @swagger
 * /txn/transfer:
 *   post:
 *     summary: Transfer funds
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - toAccount
 *             properties:
 *               amount:
 *                 type: number
 *               toAccount:
 *                 type: string
 *     responses:
 *       200:
 *         description: Transfer successful
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
transactionRouter.post('/transfer', authenticate, transferTx);

/**
 * @swagger
 * /txn/withdraw:
 *   post:
 *     summary: Withdraw funds
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - toAccount
 *             properties:
 *               amount:
 *                 type: number
 *               toAccount:
 *                 type: string
 *     responses:
 *       200:
 *         description: Withdrawal successful
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
transactionRouter.post('/withdraw', authenticate, withdrawTx);

/**
 * @swagger
 * /txn/transactions:
 *   get:
 *     summary: Get transaction history
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Transaction history retrieved successfully
 *       401:
 *         description: Unauthorized
 */
transactionRouter.get('/transactions', authenticate, getTransactionHistory);

export default transactionRouter;