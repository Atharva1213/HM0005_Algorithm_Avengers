const mongoose=require("mongoose");
const dotenv=require("dotenv");
dotenv.config({path:"../Config.env"});
const DB=process.env.DB;
mongoose.connect(DB)
.then(()=>{console.log("Database successfully connect....")})
.catch((error)=>{
      console.log(error.message);
})   

