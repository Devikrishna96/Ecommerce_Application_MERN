// const express= require('express')
// const cors=require('cors')
// require('dotenv').config();
// const app = express()
// const mongoose= require('mongoose');
// const apiRouter = require('./Routes');
// const cookieParser=require('cookie-parser');
// const { stripeWebhook } = require('./Controllers/stripewebhookController');





// const port = process.env.PORT;
// const DB_CONNECTION_LINK = process.env.DB_CONNECTION_LINK;
// const corsOptions={
//     origin: process.env.FRONTEND_URL,
//     credentials: true,
//   }



//   mongoose.connect(DB_CONNECTION_LINK) 
// .then(()=>{
//   console.log("connected to database")
// })
// .catch((err)=>{
//     console.log(err)
//   console.log("DB Connection error")
// })



// app.post(
//   '/api/v1/stripe/webhook',
//   express.raw({ type: 'application/json' }),
//   stripeWebhook
// );


// app.use(cookieParser())

// app.use(cors(corsOptions))
// app.get('/', (req, res) => {
//   res.send('Hello world');
// });



// app.use(express.json())
// app.use('/api',apiRouter)

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
//   })











const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const mongoose = require('mongoose');
const apiRouter = require('./Routes');
const cookieParser = require('cookie-parser');
const { stripeWebhook } = require('./Controllers/stripewebhookController');

const port = process.env.PORT;
const DB_CONNECTION_LINK = process.env.DB_CONNECTION_LINK;

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};

// ✅ Connect to MongoDB
mongoose
  .connect(DB_CONNECTION_LINK)
  .then(() => console.log("Connected to database"))
  .catch((err) => {
    console.log(err);
    console.log("DB Connection error");
  });

// ✅ Stripe webhook route — must come BEFORE other middlewares
app.post(
  '/api/v1/stripe/webhook',
  express.raw({ type: 'application/json' }),
  stripeWebhook
);

// ✅ Normal middlewares — after webhook only
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

// ✅ Regular routes
app.use('/api', apiRouter);

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
