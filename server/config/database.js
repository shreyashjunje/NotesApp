const mongoose=require('mongoose');
require('dotenv').config();

const connect=async ()=> {

    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(()=>console.log("Db connection successful"))
    .catch((error)=>{
        console.log(error);
        console.log("db connection issue")
        process.exit(1);

    })
}
module.exports=connect;