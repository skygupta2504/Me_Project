import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import postRoutes from './routes/posts.js';
import userRouter from "./routes/user.js";
const app=express();
app.use(bodyParser.json({limit : "30mb", extended : true}))
app.use(bodyParser.urlencoded({limit : "30mb", extended : true}))
app.use(cors());
app.use('/posts', postRoutes);
app.use("/user", userRouter);
const CONNECTION_URL='mongodb+srv://akash_gupta:Allsmall10@mecluster.ew66d2j.mongodb.net/?retryWrites=true&w=majority&appName=Mecluster'
const PORT= process.env.PORT || 3000;
mongoose.connect(CONNECTION_URL)
.then(() => app.listen(PORT, () => console.log(`Sever on : ${PORT}`)))
.catch((error) => console.log(error.message));










