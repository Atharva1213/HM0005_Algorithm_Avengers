//require the module
const express=require("express"); 
const dotenv=require("dotenv");
const cors = require("cors");
const sessions = require("express-session");
const cookieParser = require("cookie-parser");
dotenv.config({path:"./Config.env"}); 
require("./db/database"); 
const PORT=process.env.PORT;
const SESSION_SECRET = process.env.SESSION_SECRET;
const ONEWEEK = 1000 * 60 * 60 * 24 * 7;

const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    sessions({
      secret: SESSION_SECRET,
      saveUninitialized: true,
      cookie: { maxAge: ONEWEEK },
      resave: false,
    })
  );

app.use(cors())
app.use(cookieParser());
const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register"); 

app.use("/api/login", loginRouter);
app.use("/api/register", registerRouter);

app.listen(PORT,()=>{
         console.log(`Server Listening on ${process.env.PORT}`);
})




