const User=require("../models/User")

exports.getAllUser=async(req,res)=>{
    try{

      const allUser=await User.find({},{
        name:true,
        email:true,
        password:true,
        
      });

      console.log(allUser)

      return res.status(200).json({
        success:true,
        message:"fetched all users",
        allUser
      })


    }
    catch(error){

        return res.status(500).json({
            success:false,
            message:"can not fetched all users"
          })

    }
}