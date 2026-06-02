import { Router } from "express";
import DocumentService from "./document-service";
import PDFDocument from "pdfkit";
import DocumentMiddlewares from "./document-middlewares";
import HistoryService from "../history/history-service";
import { historyMiddleware } from "../history/history-middlewares";



export default class DocumentApi {
    public router: Router;

    constructor(private documentService: DocumentService ,private historyService: HistoryService) {
        this.router = Router();
        this.setRoutes();
    }

    setRoutes() {
        const histMW = historyMiddleware(this.historyService);
        this.router.post("/", DocumentMiddlewares.validateDocument,histMW, async (req, res, next) => {
            try {
                const userId = req.userId;
                const { path, title, content } = req.body;
                const documentDetails = await this.documentService.createDocument(userId, path, title, content);
                res.locals.docId = documentDetails.id;
                res.locals.docPath = documentDetails.path;
                res.locals.docAuthor = documentDetails.author;
                res.status(201).json(documentDetails);
            } catch (err) {
                next(err);
            }
        });

        this.router.get("/", async (req, res, next) => {
            try {
                const documents = await this.documentService.getAllDocuments();
                res.status(200).json(documents);
            } catch (err) {
                next(err);
            }
        });

        this.router.get("/:id", async (req, res, next) => {
            try {
                const document = await this.documentService.getDocumentById(req.params.id);
                res.status(200).json(document);
            } catch (err) {
                next(err);
            }
        });

        this.router.delete("/:id",histMW, async (req, res, next) => {
            try {
                const docToDelete = await this.documentService.getDocumentById(req.params.id);
                res.locals.docId = docToDelete.id;
                res.locals.docPath = docToDelete.path;
                res.locals.docAuthor = docToDelete.author;
                res.status(204).send();
            } catch (err) {
                next(err);
            }
        });

        this.router.put("/:id", DocumentMiddlewares.validateDocument,histMW, async (req, res, next) => {
            try {
                const updatedDoc = await this.documentService.updateDocument(req.body, req.userId);
                res.locals.docId = updatedDoc.id;
                res.locals.docPath = updatedDoc.path;
                res.locals.docAuthor = updatedDoc.author;
                res.status(200).json(updatedDoc);
            } catch (err) {
                next(err);
            }
        });
        this.router.get("/download/:id", async (req, res, next) => {
            try {
                const document = await this.documentService.getDocumentForDownload(req.params.id);

                const pdf = new PDFDocument();
                res.setHeader("Content-Type", "application/pdf");
                res.setHeader(
                    "Content-Disposition",
                    `attachment; filename="${document.title}.pdf"`
                );

                pdf.pipe(res);

                pdf.fontSize(20).text(document.title, { underline: true });
                pdf.moveDown();
                pdf.fontSize(12).text(document.content);

                pdf.end();
            } catch (err) {
                next(err);
            }
        });
    }
}