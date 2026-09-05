import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import connectDB from './config/db.js';
import './config/instrument.js'
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from './controller/webhooks.js';
import companyRoutes from "./routes/companyRoutes.js"
import connectCloudinary from './config/cloudinary.js';
import jobRoutes from './routes/jobRoutes.js';
import userRoutes from './routes/userRoutes.js';
import {clerkMiddleware} from '@clerk/express';

//initialize express
const app = express()

//middleware
app.use(cors()) // for resorce sharing from different origin
app.use(express.json()) // body parser
app.use(clerkMiddleware())

//routes
app.get('/',(req,res)=> res.send('API working'))

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My error!");
});

app.post('/webhooks',clerkWebhooks)

app.use('/api/company',companyRoutes)
app.use('/api/jobs',jobRoutes)
app.use('/api/user',userRoutes)

// connect ot database
await connectDB()
await connectCloudinary();

//Port
const PORT = process.env.PORT || 5000

Sentry.setupExpressErrorHandler(app);

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})