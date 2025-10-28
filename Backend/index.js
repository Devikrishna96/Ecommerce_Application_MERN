const express= require('express')
const cors=require('cors')
require('dotenv').config();
const app = express()
const mongoose= require('mongoose');
const apiRouter = require('./Routes');
const cookieParser=require('cookie-parser');
const { stripeWebhook } = require('./Controllers/stripewebhookController');





const port = process.env.PORT;
const DB_CONNECTION_LINK = process.env.DB_CONNECTION_LINK;
const corsOptions={
    origin: process.env.FRONTEND_URL,
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
app.get('/', (req, res) => {
  res.send('Hello world');
});

app.post(
  '/api/v1/stripe/webhook',
  express.raw({ type: 'application/json' }),
  stripeWebhook
);

app.use(express.json())
app.use('/api',apiRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })