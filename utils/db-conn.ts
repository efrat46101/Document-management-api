import { Db, MongoClient } from "mongodb";
import { config } from "dotenv";

config();

const COMPANY_DB_NAME = "document";

export default class DbConn {
    private connection!: MongoClient;

    constructor() { }

    async init() {
        const DB_URL = process.env.MONGODB_URI;
        if (!DB_URL) throw new Error("MONGODB_URI is not defined in environment variables.");
        this.connection = await MongoClient.connect(DB_URL);
    }

    getCompanyDB(): Db {
        return this.connection.db(COMPANY_DB_NAME);
    }

    async terminate() {
        await this.connection.close();
    }
}