const express= require('express')
const cors=require('cors')
require('dotenv').config();
const app = express()
const mongoose= require('mongoose');
const apiRouter = require('./Routes');
const cookieParser=require('cookie-parser')





const port = process.env.PORT;
const DB_CONNECTION_LINK = process.env.DB_CONNECTION_LINK;
const corsOptions={
    origin: "https://ecommerce-application-mernfron-git-d4491e-devikrishnas-projects.vercel.app/",
    credentials: true,
  }



  mongoose.connect(DB_CONNECTION_LINK) 
.then(()=>{
  console.log("connected to database")
})
.catch((err)=>{
    console.log(err)
  console.log("DB Connection error")
})

app.use(cookieParser())

app.use(cors(corsOptions))
app.use(express.json())
app.use('/api',apiRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })