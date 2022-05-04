import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'


const auth=asyncHandler( async(req,res,next)=>{

let token

if(req.headers.authorization){

  

    try{

        

        token=req.headers.authorization

       

        const decoded=jwt.verify(token,process.env.JWT_SECRET)

        req.user = await User.findById(decoded.id).select('-password')
       
        

        next()
        
    }

    catch(err){
        res.status(401)
        throw new Error('authorization failed due to wrong token')
    }


}

else{

    res.status(401)
    throw new Error ('no token found')
}



})


export default auth