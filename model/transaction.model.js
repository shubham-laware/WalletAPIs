import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema({
  wallet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Wallet',
    required: true,
  },

  transactionID:{
    type:String,
    required:true
  },

  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ['deposit', 'withdrawal', 'transfer'],
    required: true,
  },

  toAccount:{
    type:String,
    required:true
  },



}, { timestamps: true });

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
