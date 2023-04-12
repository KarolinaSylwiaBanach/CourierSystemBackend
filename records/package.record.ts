import {pool} from "../utils/db";
import {ValidationError} from "../utils/errors";
import {v4 as uuid} from "uuid";
import {FieldPacket} from "mysql2";
import { PackageEntity } from "../types/package/package.entity";

type PackageRecordResults = [PackageRecord[], FieldPacket[]];

export class PackageRecord implements PackageEntity {
    id?: string;
    size: string;
    nameSender: string;
    nameRecipient: string;
    addressSender: string;
    addressRecipient: string;
    status: string;
    courierId: string | null;

    constructor(obj: PackageEntity) {
        if (!obj.nameSender || obj.nameSender.length < 3 || obj.nameSender.length > 50) {
            throw new ValidationError('Sender name must be between 3 and 50 characters long.');
        }

        if (!obj.nameRecipient || obj.nameRecipient.length < 3 || obj.nameRecipient.length > 50) {
            throw new ValidationError('Recipient name must be between 3 and 50 characters long.');
        }

        if (!obj.addressSender || obj.addressSender.length < 5 || obj.addressSender.length > 50) {
            throw new ValidationError('Sender address must be between 5 and 50 characters long.');
        }

        if (!obj.addressRecipient || obj.addressRecipient.length < 5 || obj.addressRecipient.length > 50) {
            throw new ValidationError('Recipient address must be between 5 and 50 characters long.');
        }

        this.id = obj.id;
        this.size= obj.size;
        this.nameSender= obj.nameSender;
        this.nameRecipient= obj.nameRecipient;
        this.addressSender= obj.addressSender;
        this.addressRecipient= obj.addressRecipient;
        this.status= obj.status;
        this.courierId= obj.courierId;
    }

    async insert(): Promise<string> {
        if (!this.id) {
            this.id = uuid();
        }

        await pool.execute("INSERT INTO `package` VALUES(:id, :size, :nameSender, :nameRecipient, :addressSender, :addressRecipient, :status, :courierId)", {

            id: this.id,
            size: this.size,
            nameSender: this.nameSender,
            nameRecipient: this.nameRecipient,
            addressSender: this.addressSender,
            addressRecipient: this.addressRecipient,
            status: this.status,
            courierId: this.courierId,
        });

        return this.id;
    }

    static async listAll(): Promise<PackageRecord[]> {
        const [results] = await pool.execute("SELECT * FROM `package`") as PackageRecordResults;
        return results.map(obj => new PackageRecord(obj));
    }

    static async getOne(id: string): Promise<PackageRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `package` WHERE `id` = :id", {
            id,
        }) as PackageRecordResults;
        return results.length === 0 ? null : new PackageRecord(results[0]);
    }

    async delete(): Promise<void> {
        await pool.execute("DELETE FROM `package` WHERE `id` = :id", {
            id: this.id,
        });
    }
    async update(): Promise<void> {
        await pool.execute(
            "UPDATE `package` SET `size` = :size, `nameSender` =:nameSender, `nameRecipient` = :nameRecipient, `addressSender` = :addressSender, `addressRecipient` =:addressRecipient, `status` = :status, `courierId` = :courierId WHERE `id` = :id",{
            id: this.id,
            size: this.size,
            nameSender: this.nameSender,
            nameRecipient: this.nameRecipient,
            addressSender: this.addressSender,
            addressRecipient: this.addressRecipient,
            status: this.status,
            courierId: this.courierId,
        });
    }
}
