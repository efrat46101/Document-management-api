import { Request, Response, NextFunction } from 'express';
import HistoryService from './history-service';
import { operationTipe } from './history-models';

export const historyMiddleware = (historyService: HistoryService) => {
    return async (req: Request, res: Response, next: NextFunction) => {

        res.on('finish', async () => {
            if (res.statusCode >= 200 && res.statusCode < 300) {
                const operation = {
                    user: (req as any).userId,
                    documentid: res.locals.docId || req.params.id,
                    documentPath: res.locals.docPath,
                    documentAuthor: res.locals.docAuthor,
                    timestamp: new Date(),
                    operationType: getOperationType(req.method),
                };
                await historyService.createOperation(operation);
            }
        });

        next();
    };
};

function getOperationType(method: string): operationTipe {
    if (method === 'POST') return operationTipe.CREATE;
    if (method === 'PUT' || method === 'PATCH') return operationTipe.UPDATE;
    if (method === 'DELETE') return operationTipe.DELETE;
    return operationTipe.CREATE;
}