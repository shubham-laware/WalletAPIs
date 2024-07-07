import mongoose, { Schema } from "mongoose";

const walletSchema = new Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    upiID: {
        type: String,
        unique: true,
      },
    balance: {
      type: Number,
      default: 0,
    },
    transactionHistory: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Transaction',
    }],
  }, { timestamps: true });
  
  const Wallet = mongoose.model('Wallet', walletSchema);
  
  export default Wallet;
  