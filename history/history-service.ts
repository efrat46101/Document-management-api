import { Operation } from "./history-models";
import HistoryDal from "./history-dal";

export default class HistoryService {
    constructor(private historyDal: HistoryDal) { }

    async createOperation(operationData: Omit<Operation, 'timestamp'>): Promise<void> {
        const fullOperation: Operation = {
            ...operationData,
            timestamp: new Date()
        };
        await this.historyDal.createOperation(fullOperation);
    }

    async listOperations(query: any): Promise<Array<Operation>> {
        const page = Number(query.page) || 0;
        const limit = Number(query.limit) || 10;
        const skip = page * limit;
        const filter: any = {};

        if (query.user) filter.user = query.user;
        if (query.documentid) filter.documentid = query.documentid;
        if (query.documentAuthor) filter.documentAuthor = query.documentAuthor;
        if (query.operationType) filter.operationType = query.operationType;
        if (query.pathPrefix) {
            filter.documentPath = { $regex: "^" + query.pathPrefix };
        }

        return this.historyDal.listOperations(filter, skip, limit);
    }

    async clearHistory(): Promise<void> {
        await this.historyDal.clearHistory();
    }
}