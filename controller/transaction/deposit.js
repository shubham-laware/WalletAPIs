
import Transaction from "../../model/transaction.model.js";
import Wallet from "../../model/wallet.model.js";
import AsyncTransactionHandler from "../../utils/asyncTransactionHandler.js";
import generateTxnId from "../../utils/generateTxnId.js";

const depositTx = AsyncTransactionHandler(async (session, req, res) => {
    const { amount } = req.body;
    const userId = req.user._id;

    const wallet = await Wallet.findOne({ user: userId });

    if (!wallet) {
        throw new Error('Wallet not found for the user');
    }

    if (!amount || isNaN(amount)) {
        throw new Error('Invalid amount');
    }

    const depositAmount = Number(amount);

    if (depositAmount <= 0) {
        throw new Error('Amount must be greater than 0');
    }

    const transactionID = generateTxnId();

    // Update wallet balance first
    const updatedWallet = await Wallet.findByIdAndUpdate(
        wallet._id,
        { $inc: { balance: depositAmount } },
        { new: true, session }
    );

    if (!updatedWallet) {
        throw new Error('Failed to update wallet balance');
    }

    // Now create the transaction
    const transaction = await Transaction.create([{
        type: 'deposit',
        wallet: wallet._id,
        transactionID,
        amount: depositAmount,
        toAccount: wallet.upiID,
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
        message: 'Deposit successful',
        data: data,
    });
});

export default depositTx;