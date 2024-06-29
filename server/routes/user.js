const express=require('express')
const router=express.Router();


const {signUp,login}=require("../controllers/Auth")
const {getAllUser}=require("../controllers/User")

router.post("/signup",signUp);
router.post("/login",login);
router.get("/getalluser",getAllUser);


module.exports=router;