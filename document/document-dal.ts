import { Collection } from "mongodb";
import { Document as DocumentModel, Document_details } from "./document-models";
import DbConn from "../utils/db-conn";

export const DOCUMENT_NOT_FOUND_ERROR = "Document not found";
const DOCUMENT_COLLECTION_NAME = "documents";

export default class DocumentDal {
    public documentCollection!: Collection<DocumentModel>;

    constructor(dbConn: DbConn) {
        this.documentCollection = dbConn.getCompanyDB().collection(DOCUMENT_COLLECTION_NAME);
    }
    async createDocument(document: DocumentModel): Promise<Document_details> {
        await this.documentCollection.insertOne(document);
        return {
            id: document.id,
            author: document.author,
            path: document.path,
            title: document.title
        };
    }
    async getAllDocuments(): Promise<Document_details[]> {
        const documents = await this.documentCollection.find().toArray();
        return documents.map(doc => ({
            id: doc.id,
            author: doc.author,
            path: doc.path,
            title: doc.title
        }));
    }

    async getDocumentById(id: string): Promise<DocumentModel> {
        const document = await this.documentCollection.findOne({ id: id });
        if (!document) {
            throw Error(DOCUMENT_NOT_FOUND_ERROR);
        }
        return {
            id: document.id,
            author: document.author,
            path: document.path,
            title: document.title,
            content: document.content,
            createdAt: document.createdAt,
            lastUpdatedAt: document.lastUpdatedAt,
            lastUpdatedBy: document.lastUpdatedBy
        };
    }

    async updateDocument(document: DocumentModel): Promise<DocumentModel> {
        const result=await this.documentCollection.updateOne({ id: document.id }, { $set: document });
        if (result.matchedCount === 0) {
            throw Error(DOCUMENT_NOT_FOUND_ERROR);
        }
        return document;

    }
    async deleteDocument(id: string): Promise<void> {
        const result = await this.documentCollection.deleteOne({ id: id });
        if (result.deletedCount === 0) {
            throw Error(DOCUMENT_NOT_FOUND_ERROR);
        }
    }
}