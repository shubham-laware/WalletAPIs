import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();

const TOKEN_SECRET = process.env.TOKEN_SECRET;

const generateToken = (user)=>{
    try {
        
        const payload = {
            id:user._id
        }

        return jwt.sign(payload,TOKEN_SECRET)

    } catch (error) {
        console.log('TOKEN ERROR :', error);
        throw error;
    }
}


export default generateToken;