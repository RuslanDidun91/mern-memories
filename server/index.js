import * as dotenv from "dotenv";
dotenv.config();
// modern node import syntax 
//we need add "type": "module" in package.json
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';

//initializing app
const app = express();

app.use('/posts', postRoutes);

//setup bodyparser to set request propperly 
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const CONNECTION_URL = 'mongodb+srv://RuslanDidun:testpassword@cluster0.7ehlirj.mongodb.net/?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL).then(() =>
  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  })
);

mongoose.set('strictQuery', false)

