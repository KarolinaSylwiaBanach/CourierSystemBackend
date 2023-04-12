import { CourierEntity } from "../courier";
import { PackageEntity } from "./package.entity";

export type CreatePackageReq = Omit<PackageEntity, 'id'>;

export interface GetSinglePackageRes {
    packageSingle: PackageEntity;
}

export interface ListCouriersRes {
    couriersList: CourierEntity[];
    packagesList: PackageEntity[];
}

export interface SetCourierForPackageReq {
    courierId: string;
}