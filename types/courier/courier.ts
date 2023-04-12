import { CourierEntity } from "./courier.entity";


export type CreateCourierReq = Omit<CourierEntity, 'id'>;

export interface ListCouriers{
    couriersList: CourierEntity[];
}