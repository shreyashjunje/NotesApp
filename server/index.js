const express=require('express');
const app=express();

require("dotenv").config();
const PORT=process.env.PORT || 8000

app.use(express.json());

const connect=require("./config/database");
connect();

const user=require("./routes/user")

app.use("/api/v1",user);

app.listen(PORT,()=>{
    console.log("app is listening on port 4000")
})

app.get("/",(req,res) => {
    res.send(`<h1>this is Homepage body</h1>`)
})