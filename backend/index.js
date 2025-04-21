import express from 'express'
import rootRouter from './Routes/index.js'
import connectDB from './config/mongoose.js'
import cors from 'cors'
import {app , io, httpServer} from './socketIO/server.js'

app.use(cors({
    origin: ['http://localhost:5173'],  
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],  
    allowedHeaders: ['Content-Type', 'Authorization'],  
    credentials: true,
}));

app.use(express.json())
app.use('/api/v1', rootRouter)

connectDB();

app.get('/health' , (req , res) => {
    res.send('API is running')
})

httpServer.listen(5000 , () => {
    console.log('Server running on port 5000')
})