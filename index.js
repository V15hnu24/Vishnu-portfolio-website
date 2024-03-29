import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import serverless from 'serverless-http';

import Crouter from './routes/posts.js'
const app = express();
dotenv.config();
app.use(express.static('client'));
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());
app.use('/', Crouter);

const CONNECTION_URL = process.env.MONGO

const PORT = process.env.PORT || 4040;

mongoose.connect(CONNECTION_URL,{useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

export default app;
// mongoose.set('useFindAndModify', false);