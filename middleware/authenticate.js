
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../model/user.model.js';
dotenv.config();

const TOKEN_SECRET = process.env.TOKEN_SECRET;

const authenticate = async(req,res,next)=>{
    try {
        const {token} = await req.cookies;
    if(!token){
        return res.status(401).json({error:'Unauthorized request'})
    }

    const decodeToken = jwt.verify(token,TOKEN_SECRET);

    const user =  await User.findById(decodeToken.id);

    if(!user) return res.status(401).json({error:'Unauthorized user'});

    req.user = user;

    next();
        
    } catch (error) {
        console.log('JWT TOKEN VERIFICATION FAILED : ',error);
        return res.status(500).json({error:'Internal Server Error'});
    }

}

export default authenticate;