import { Request, Response, NextFunction } from 'express';

export function extractUserId(req: Request, res: Response, next: NextFunction) {
    const userId = req.header("X-User-Id");

    if (!userId) {
        return res.status(401).json({ message: "Missing X-User-Id header" });
    }

    (req as any).userId = userId;
    next();
}


export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error("--- Error Investigation Details ---");
    console.error(`Timestamp: ${new Date().toISOString()}`);
    console.error(`Method: ${req.method}, URL: ${req.url}`);
    console.error(`User ID: ${(req as any).userId || 'Unknown'}`);
    console.error(`Error Message: ${err.message}`);
    console.error(`Stack Trace: ${err.stack}`);
    console.error("-----------------------------------");

    const statusCode = err.status || 500;
    res.status(statusCode).json({
        error: {
            message: err.message || "An unexpected error occurred on the server.",
            status: statusCode
        }
    });
};

