import { Request, Response, NextFunction } from 'express';

export default class DocumentMiddlewares {
    static validateDocument(req: Request, res: Response, next: NextFunction) {
        const { path, title, content } = req.body;
        if (!path) return res.status(400).send("Missing path");
        if (!title) return res.status(400).send("Missing title");
        if (!content) return res.status(400).send("Missing content");
        next();
    }

}

