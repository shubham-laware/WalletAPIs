
import Transaction from "../../model/transaction.model.js";
import Wallet from "../../model/wallet.model.js";
import AsyncTransactionHandler from "../../utils/asyncTransactionHandler.js";
import generateTxnId from "../../utils/generateTxnId.js";

const withdrawTx = AsyncTransactionHandler(async (session, req, res) => {
    const { amount, toAccount } = req.body;
    const userId = req.user._id;

    const wallet = await Wallet.findOne({ user: userId });

    if (!wallet) {
        throw new Error('Wallet not found for the user');
    }

    if (!amount || isNaN(amount) || !toAccount) {
        throw new Error('Invalid amount or destination account');
    }

    const withdrawAmount = Number(amount);

    if (withdrawAmount <= 0) {
        throw new Error('Amount must be greater than 0');
    }

    if (wallet.balance < withdrawAmount) {
        throw new Error('Insufficient balance');
    }

    const transactionID = generateTxnId();

    // Update wallet balance first
    const updatedWallet = await Wallet.findOneAndUpdate(
        { _id: wallet._id, balance: { $gte: withdrawAmount } },
        { $inc: { balance: -withdrawAmount } },
        { new: true, session }
    );

    if (!updatedWallet) {
        throw new Error('Failed to withdraw');
    }

    // Now create the transaction
    const transaction = await Transaction.create([{
        type: 'withdrawal',
        wallet: wallet._id,
        transactionID,
        amount: withdrawAmount,
        toAccount,
    }], { session });

    // Update wallet with transaction history
    await Wallet.findByIdAndUpdate(
        wallet._id,
        { $push: { transactionHistory: transaction[0]._id } },
        { session }
    );

    const data = {
        type: transaction[0].type,
        transactionID: transaction[0].transactionID,
        amount: transaction[0].amount,
        toAccount: transaction[0].toAccount,
        time: transaction[0].createdAt
    };

    res.status(200).json({
        message: 'Withdrawal successful',
        data: data,
    });
});

export default withdrawTx;