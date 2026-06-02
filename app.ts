import express, { Express } from "express";
declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

import DbConn from "./utils/db-conn";
import DocumentDal from "./document/document-dal";
import DocumentService from "./document/document-service";
import DocumentApi from "./document/document-api";
import HistoryDal from "./history/history-dal";
import HistoryService from "./history/history-service";
import HistoryApi from "./history/history-api";
import { extractUserId, errorMiddleware } from "./utils/common-middlewares";



const HOST = "127.0.0.1";
const PORT = 5000;

export default class App {
    private app: Express;
    private dbConn!: DbConn;

    constructor() {
        this.app = express();
    }

    async init() {
        this.dbConn = new DbConn();
        await this.dbConn.init();

        const historyDal = new HistoryDal(this.dbConn);
        const historyService = new HistoryService(historyDal);
        const historyApi = new HistoryApi(historyService);

        const documentDal = new DocumentDal(this.dbConn);
        const documentService = new DocumentService(documentDal);
        const documentApi = new DocumentApi(documentService, historyService);

        this.setRoutes(documentApi, historyApi);
    }

    // בתוך קובץ app.ts, מתודת setRoutes:
    private setRoutes(documentApi: DocumentApi, historyApi: HistoryApi) {
        this.app.use(express.json());

        this.app.use(extractUserId);

        this.app.use("/api/documents", documentApi.router);
        this.app.use("/api/history", historyApi.router);

        this.app.use(errorMiddleware); 

         this.app.listen(PORT, HOST, () => {
            console.log(`Server is listening on: http://${HOST}:${PORT}/`);
        });
    }

    async terminate() {
        if (this.dbConn) {
            await this.dbConn.terminate();
        }
    }
}