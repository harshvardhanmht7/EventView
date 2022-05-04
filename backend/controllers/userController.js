
import asyncHandler from 'express-async-handler'

import User from '../models/userModel.js'

import bcrypt from 'bcryptjs'
import generateToken from '../Utils/generateToken.js'
 
// @desc    Auth user & get token
// @route   Post /api/users/login
// @access  Public

  const loginUser= asyncHandler(async (req, res) => {
    
    const {email,password} = req.body;

    const user= await User.findOne({email:email})
      const userPassword=await bcrypt.compare(password,user.password)
    
    if (user&& userPassword )

    {
      res.json({
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
        token:generateToken(user._id)

      })
    }
    else{
      res.status(401)
      throw new Error('Invalid Email or Password')
    }



  })





//register new user
// @route   post /api/users
//post request

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const salt= await bcrypt.genSalt(10)
  const pword= await bcrypt.hash(password,salt)

  const user = await User.create({
    name,
    email,
    password:pword,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})




   
// @desc    get users profile
// @route   get /api/users/profile
// @access  Private

const getUserProfile= asyncHandler(async (req, res) => {

  const user= await User.findById(req.user._id)
   
  
  if (user )

  {
    res.json({
      _id:user._id,
      name:user.name,
      email:user.email,
      isAdmin:user.isAdmin,
     

    })
  }
  else{
    res.status(401)
    throw new Error('invalid user id')
  }



})





 
// @desc    update users profile
// @route   put /api/users/profile
// @access  Private

const updateUserProfile= asyncHandler(async (req, res) => {

  const user= await User.findById(req.user._id)
   
  
  if (user )

   {

        user.name=req.body.name||user.name
        user.email=req.body.email||user.email

        if(req.body.password){
          const salt = await bcrypt.genSalt(10);
          user.password= await bcrypt.hash(req.body.password,salt)
          
        }
        
    user.save()

    res.json({
      _id:user._id,
      name:user.name,
      email:user.email,
      isAdmin:user.isAdmin,
     

    })

   }


  else{
    res.status(401)
    throw new Error('invalid user id')
  }



})



  export{
 loginUser,
 getUserProfile,
 registerUser,
 updateUserProfile
  }