import {pool} from "../utils/db";
import {ValidationError} from "../utils/errors";
import {v4 as uuid} from "uuid";
import {FieldPacket} from "mysql2";
import {CourierEntity} from "../types/courier/courier.entity";

type CourierRecordResults = [CourierRecord[], FieldPacket[]];

export class CourierRecord implements CourierEntity {
    public id?: string;
    public name: string;
    public lastname: string;

    constructor(obj: CourierEntity) {
        if (!obj.name || obj.name.length < 3 || obj.name.length > 25) {
            throw new ValidationError('Name must be between 3 and 25 characters long.');
        }

        if (!obj.lastname || obj.lastname.length < 3 || obj.lastname.length > 30) {
            throw new ValidationError('Last name must be between 3 and 30 characters long.');
        }

        this.id = obj.id;
        this.name = obj.name;
        this.lastname = obj.lastname;
    }

    async insert(): Promise<string> {
        if (!this.id) {
            this.id = uuid();
        }

        await pool.execute("INSERT INTO `couriers`(`id`, `name`, `lastname`) VALUES(:id, :name, :lastname)", {
            id: this.id,
            name: this.name,
            lastname: this.lastname,
        });

        return this.id;
    }

    static async listAll(): Promise<CourierRecord[]> {
        const [results] = (await pool.execute("SELECT * FROM `couriers` ORDER BY `lastname` ASC")) as CourierRecordResults;

        return results.map(obj => new CourierRecord(obj));
    }

    static async getOne(id: string): Promise<CourierRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `couriers` WHERE `id` = :id", {
            id,
        }) as CourierRecordResults;

        return results.length === 0 ? null : new CourierRecord(results[0]);
    }

    // async update(): Promise<void> {
    //     await pool.execute("UPDATE `couriers` SET `name` = :name, `lastname` = :lastname WHERE `id` = :id", {
    //         id: this.id,
    //         name: this.name,
    //         lastname: this.lastname,
    //     });
    // }
}
