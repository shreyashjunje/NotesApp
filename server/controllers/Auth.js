const User = require("../models/User")
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

require('dotenv').config()

exports.signUp=async(req,res)=>{
    try{

        //get data 
        const {name,email,password}=req.body;
        //validation
        if(!name || !email || !password){
            return res.status(500).json({
                success:false,
                message:"All fields are required",
            })
        }
        //check if this entry already present in database or not
        const existingUser=await User.findOne({email});

        if(existingUser){
            return res.status(500).json({
                success:false,
                message:"This user already exist"
            })
        }

        //encrypt the password
        let hashedPassword;
        try{
            hashedPassword= await bcrypt.hash(password,10);

        }
        catch(error){
            return res.status(500).json({
                success:false,
                message:"Error in hashing password"
            })
        }
        //create an entry in a database
        const user=await User.create({
            name,email,password:hashedPassword,
        })

        //return response
        return res.status(200).json({
            message:true,
            message:"Entry created successfully"
        })
    


    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"user can not registred please another email"
        })

    }
}


exports.login=async (req,res) =>{
    try{

        //get the data
        const {email,password}=req.body;
        
        //valodation
        if(!email || !password){
            return res.status(500).json({
                success:false,
                message:"All fields are required",
            })
        }
        
        //check if this user alredy exist or not
        let user=await User.findOne({email});
        if(!user){
            return res.status(500).json({
                success:false,
                message:"user does not exist please sign up",
            })
        }

        let payload={
            email:user.email,
            id:user._id,
        }
        
       //verify password and generate jwt token
       if(await bcrypt.compare(password,user.password)){

        let token=jwt.sign(payload,
                        process.env.JWT_SECRET,
                        {
                            expiresIn:"2h",
                        }
        )

        //remember
        user=user.toObject();
        user.token=token;
        user.password=undefined;

        const options={
            expires:new Date( Date.now() + 3*24*60*60*1000),
            httpOnly:true,
        }
        res.cookie("token",token,options).status(200).json({
            success:true,
            token,
            user,
            message:"user logged in successfully",
        })

       }else{
        //password do not matched
        return res.status(500).json({
            success:false,
            message:"password incorrect"
        })
       }



    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"can't login please try again"
        })
    }
}