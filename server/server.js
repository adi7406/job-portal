import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import connectDB from './config/db.js';

//initialize express
const app = express()

//middleware
app.use(cors()) // for resorce sharing from different origin
app.use(express.json()) // body parser

//routes
app.get('/',(req,res)=> res.send('API working'))

// connect ot database
await connectDB()

//Port
const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})