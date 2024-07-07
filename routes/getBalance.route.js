import { Router } from "express";
import { getBalance as getBalanceController} from "../controller/getBalance.contoller.js";
import authenticate from "../middleware/authenticate.js";

const getBalanceRouter = Router();

/**
 * @swagger
 * /account/balance:
 *   get:
 *     summary: Get user balance
 *     tags: [Account]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Balance retrieved successfully
 *       401:
 *         description: Unauthorized
 */
getBalanceRouter.get('/balance', authenticate, getBalanceController);

export default getBalanceRouter;