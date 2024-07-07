import User from "../../model/user.model.js";
import AsyncTransactionHandler from "../../utils/asyncTransactionHandler.js";
import transferService from "../../services/transfer.service.js";
import validateUPI from "../../utils/validateUpi.js";
import Wallet from "../../model/wallet.model.js";
import generateTxnId from "../../utils/generateTxnId.js";

const transferTx = AsyncTransactionHandler(async (session, req, res) => {
  const user = await req.user;
  const { type, toAccount, amount } = req.body;

  const wallet = await Wallet.findOne({user:user._id});
  
  if (!type  || !toAccount || !amount) {
    throw new Error('All fields are required');
  }

  if(isNaN(amount)) throw new Error('Invalid amount');

  const parseToAccount = toAccount.toString();
  const parseAmount = Number(amount);


  const isReciverUpiValid =  validateUPI(toAccount);

  if(!isReciverUpiValid) throw new Error('Invalid receiver upi ID')

  if (parseAmount <= 0) {
    throw new Error('Amount must be greater than 0');
  }

  if (parseAmount > wallet.balance) {
    throw new Error('Insufficient funds');
  }

  const transactionID = generateTxnId();


  const result = await transferService(user._id, wallet._id, transactionID, parseToAccount, parseAmount, session);

  res.status(200).json({ message: 'Transfer successful', result });
});

export default transferTx;