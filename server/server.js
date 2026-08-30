import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import connectDB from './config/db.js';
import './config/instrument.js'
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from './controller/webhooks.js';

//initialize express
const app = express()

//middleware
app.use(cors()) // for resorce sharing from different origin
app.use(express.json()) // body parser

//routes
app.get('/',(req,res)=> res.send('API working'))

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My error!");
});

app.post('/webhooks',clerkWebhooks)

// connect ot database
await connectDB()

//Port
const PORT = process.env.PORT || 5000

Sentry.setupExpressErrorHandler(app);

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})