// modern node import syntax 
//we need add "type": "module" in package.json
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import * as dotenv from "dotenv";
dotenv.config();

//initializing app
const app = express();

//setup bodyparser to set request propperly 
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());


app.use('/posts', postRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL).then(() =>
  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  })
);

mongoose.set('strictQuery', false);

