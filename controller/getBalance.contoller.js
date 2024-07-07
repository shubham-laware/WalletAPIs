import Wallet from "../model/wallet.model.js";
import AsyncHandler from "../utils/asyncHandler.js"

const getBalance = AsyncHandler(async(req,res)=>{

    const userWallet = await Wallet.findOne({user:req.user._id})

    if(userWallet) return res.status(200).json({balance:userWallet.balance});
})

export {getBalance} 