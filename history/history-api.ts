import { Router, Request, Response, NextFunction } from 'express';
import HistoryService from './history-service';

export default class HistoryApi {
    public router: Router;

    constructor(private historyService: HistoryService) {
        this.router = Router();
        this.setRoutes();
    }

    private setRoutes() {
        this.router.get('/', async (req: Request, res: Response, next: NextFunction) => {
            try {
                const operations = await this.historyService.listOperations(req.query);
                res.json(operations);
            } catch (error) {
                next(error);
            }
        });
        this.router.delete('/', async (req: Request, res: Response, next: NextFunction) => {
            try {
                await this.historyService.clearHistory();
                res.status(200).json({ message: "History cleared successfully" });
            } catch (error) {
                next(error);
            }
        });
    }
}