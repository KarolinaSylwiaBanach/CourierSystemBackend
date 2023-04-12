import {Router} from "express";
import { CourierRecord } from "../records/courier.record";
import {CreateCourierReq} from "../types/courier/courier";
import {ValidationError} from "../utils/errors";

export const courierRouter = Router();

courierRouter 

    .get('/', async (req, res) => {
        const couriersList = await CourierRecord.listAll();

        res.json({couriersList,});
    })

    .post('/', async (req, res) => {
        const newCourier = new CourierRecord(req.body as CreateCourierReq);
        await newCourier.insert();

        res.json(newCourier);
    })
;
