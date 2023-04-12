const express = require("express");
const cors = require("cors");
import 'express-async-errors';
import {handleError} from "./utils/errors";
import rateLimit from "express-rate-limit";
import './utils/db';
import { courierRouter } from "./routers/courier";
import { packageRouter } from "./routers/package";

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(express.json());
app.use(rateLimit({
    windowMs: 3 * 60 * 1000, // 3 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 5 minutes)
}))

app.use('/courier', courierRouter);
app.use('/package', packageRouter);

app.use(handleError);

app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on port http://localhost:3001')
})
