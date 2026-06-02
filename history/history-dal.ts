import { Collection } from "mongodb";
import { Operation } from "./history-models";
import DbConn from "../utils/db-conn";

const DOCUMENT_COLLECTION_NAME = "history";

export default class HistoryDal {
    public historyCollection!: Collection<Operation>;

    constructor(dbConn: DbConn) {
        this.historyCollection = dbConn.getCompanyDB().collection(DOCUMENT_COLLECTION_NAME);
    }

    async createOperation(operation: Operation) {
        await this.historyCollection.insertOne(operation);
    }

    async listOperations(filter: any, skip: number, limit: number): Promise<Array<Operation>> {
        const results = await this.historyCollection
            .find(filter)
            .sort({ timestamp: -1 }) 
            .skip(skip)
            .limit(limit) 
            .toArray();

        return results.map(({ _id, ...rest }: any) => rest as Operation);
    }
    async clearHistory() {
        await this.historyCollection.deleteMany({});
    }
}