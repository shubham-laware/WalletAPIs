import Transaction from "../model/transaction.model.js";
import AsyncHandler from "../utils/asyncHandler.js";

const getTransactionHistory = AsyncHandler(async (req, res) => {
  // Assuming you have the user's ID available in req.user._id after authentication
  const userId = req.user._id;

  const transactionHistory = await Transaction.aggregate([
    {
      $lookup: {
        from: "wallets",
        localField: "wallet",
        foreignField: "_id",
        as: "walletInfo",
      },
    },
    { $unwind: "$walletInfo" },
    {
      $match: {
        "walletInfo.user": userId, // Filter transactions for the logged-in user
      },
    },
    {
      $project: {
        _id: 0,
        transactionID: 1,
        amount: 1,
        type: 1,
        toAccount: 1,
        time: "$createdAt",
        walletUpiID: "$walletInfo.upiID",
      },
    },
    { $sort: { time: -1 } },
  ]);

  return res.status(200).json({ data: transactionHistory });
});

export default getTransactionHistory;
