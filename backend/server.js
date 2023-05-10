import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import colors from 'colors';
import productRoutes from './routes/productRoutes.js';

dotenv.config();

connectDB();

const app = express();


// CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
})

app.get('/', (req, res)=>{
    res.send('API is running!');
})

app.use('/api/products', productRoutes);

// Middleware

app.use((req, res, next)=>{
    const error=new Error(`Not found - ${req.originalUrl}`)
    res.status(404)
    next(error);
});

app.use((err, req, res, next)=>{
    const statusCode=res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
    next();
})

const PORT= process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on Port ${PORT}...`.yellow.bold))


