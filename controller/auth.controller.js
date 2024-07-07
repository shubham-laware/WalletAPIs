import User from "../model/user.model.js";
import Wallet from "../model/wallet.model.js";
import AsyncHandler from "../utils/asyncHandler.js";
import generateToken from "../utils/generateToken.js";
import generateUPI from "../utils/generateUPI.js";
import validateEmail from "../utils/validateEmail.js";
import bcrypt from 'bcryptjs'

const login = AsyncHandler( async (req,res)=>{
    const {email,password} = req.body;

    if(!email || !password) return res.status(400).json({error:'All fields are required'});

    const isEmailValid = validateEmail(email);
    if(!isEmailValid) return res.status(400).json({error:'Invalid email'})

    const user = await User.findOne({email});
    if(!user) return res.status(400).json({error:' User does not exists'});

    const isPasswordCorrect = await bcrypt.compare(password,user.password)
    if(!isPasswordCorrect) return res.status(400).json({error:'Wrong password'});
    
    const authToken =  generateToken(user);
    
    if(authToken){

        const wallet = await Wallet.findOne({user:user._id});

        const data = {
            name:user.name,
            email:user.email,
            phoneNumber:user.phoneNumber,
            upiID:wallet.upiID,
        }
        res.cookie('token',authToken,{
            httpOnly:true,
        })
        return res.status(200).json({message:'Login successful',data:data})
    }


    return res.status(500).json({error:'Internal Server Error'})
    
    
})



const signup = AsyncHandler( async (req,res)=>{
    const {name,email,phoneNumber,password} = req.body;
    
    if( !name || !email || !phoneNumber || !password ) return res.status(400).json({error:'All fields are required'});

    const phone = phoneNumber.toString();

    const isEmailValid =  validateEmail(email);
    if(!isEmailValid) return res.status(400).json({error:'Invalid email'})


    const isEmailExists = await User.findOne({email});
    if(isEmailExists) return res.status(400).json({message:'Email already exists'});

    const isPhoneNumberExists = await User.findOne({phone});
    if(isPhoneNumberExists) return res.status(400).json({message:'Phone number already exists'});



   const user = await User.create({name,email,phoneNumber:phone,password});

   if(!user) throw new Error('Something went wrong, try again later');

   const upiID = generateUPI(phone);

   const wallet = await Wallet.create({user:user._id,upiID:upiID});

   if(!wallet) throw new Error('Something went wrong, try again later')

   return res.status(201).json({message:'User registered successfully'})

})

export {login,signup}