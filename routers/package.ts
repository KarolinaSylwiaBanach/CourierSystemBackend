import {Router} from "express";
import {ValidationError} from "../utils/errors";
import {PackageRecord} from "../records/package.record"
import { CreatePackageReq, GetSinglePackageRes, ListCouriersRes, SetCourierForPackageReq } from "../types/package/package";
import { CourierRecord } from "../records/courier.record";

export const packageRouter = Router();

packageRouter

    .get('/', async (req, res) => {
        const packagesList = await PackageRecord.listAll();
        const couriersList = await CourierRecord.listAll();

        res.json({
            couriersList,
            packagesList,
        } as ListCouriersRes);
    })

    .get('/:packageId', async (req, res) => {
        const packageSingle = await PackageRecord.getOne(req.params.packageId);

        res.json({
            packageSingle,
        } as GetSinglePackageRes);
    })

    .delete('/:id', async (req, res) => {
        const packageSingle = await PackageRecord.getOne(req.params.id);

        if (!packageSingle) {
            throw new ValidationError('No such package.');
        }

        await packageSingle.delete();

        res.end();
    })

    .post('/', async (req, res) => {
        const newPackage= new PackageRecord(req.body as CreatePackageReq);
        await newPackage.insert();

        res.json(newPackage);
    })

    .patch('/courier/:packedId', async (req, res) => {
        const {body}: {
            body: SetCourierForPackageReq;
        } = req;

        const packed = await PackageRecord.getOne(req.params.packedId);

        if (packed === null) {
            throw new ValidationError('Nie znaleziono dziecka z podanym ID.');
        }

        const courier = body.courierId === '' ? null : await CourierRecord.getOne(body.courierId);


        packed.courierId = courier?.id ?? null;
        await packed.update();

        res.json(packed);
    });
