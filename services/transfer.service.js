import Transaction from "../model/transaction.model.js";
import Wallet from "../model/wallet.model.js";

const transferService = async (senderID, walletID, transactionID, toAccount, amount, session) => {
  // Update sender's wallet: decrease balance first
  const updatedWallet = await Wallet.findOneAndUpdate(
    { user: senderID, balance: { $gte: amount } },
    { $inc: { balance: -amount } },
    { new: true, session }
  );

  if (!updatedWallet) {
    throw new Error('Failed to update sender wallet or insufficient balance');
  }

  // Create the transaction
  const transaction = await Transaction.create([{
    type: 'transfer',
    wallet: walletID,
    transactionID,
    amount,
    toAccount,
  }], { session });

  // Update sender's wallet: add transaction to history
  await Wallet.findOneAndUpdate(
    { user: senderID },
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
  
  return data;  
};

export default transferService;