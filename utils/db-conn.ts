import { Db, MongoClient } from "mongodb";

const DB_URL = "mongodb+srv://app_user_new:8VT7N1JVqfSP30OP@cluster0.8nc8q9.mongodb.net/document?retryWrites=true&w=majority&appName=cluster0";
const COMPANY_DB_NAME = "document";

export default class DbConn {
    private connection!: MongoClient;

    constructor() { }

    async init() {
        this.connection = await MongoClient.connect(DB_URL);
    }

    getCompanyDB(): Db {
        return this.connection.db(COMPANY_DB_NAME);
    }

    async terminate() {
        await this.connection.close();
    }
}