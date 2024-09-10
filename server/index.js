import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import postRoutes from './routes/posts.js';
import userRouter from "./routes/user.js";
import dotenv from 'dotenv';
dotenv.config();
const app=express();
const CONNECTION_URL=process.env.REAL_CONNECTION;
// console.log(CONNECTION_URL);
app.use(bodyParser.json({limit : "30mb", extended : true}))
app.use(bodyParser.urlencoded({limit : "30mb", extended : true}))
app.use(cors());
app.use('/posts', postRoutes);
app.use("/user", userRouter);
const PORT= process.env.PORT || 3000;
mongoose.connect(CONNECTION_URL)
.then(() => app.listen(PORT, () => console.log(`Sever on : ${PORT}`)))
.catch((error) => console.log(error.message));

 








