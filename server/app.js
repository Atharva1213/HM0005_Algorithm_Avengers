//require the module
const express=require("express"); 
const dotenv=require("dotenv");
const cookieParser = require("cookie-parser");
dotenv.config({path:"./Config.env"}); 
require("./db/database"); 
const PORT=process.env.PORT;

const app=express();

const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register"); 

app.use(cookieParser());
app.use(express.json());

app.use("/api/login", loginRouter);
app.use("/api/register", registerRouter);

app.listen(PORT,()=>{
         console.log(`Server Listening on ${process.env.PORT}`);
})




