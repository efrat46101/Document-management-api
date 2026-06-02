import { Document as DocumentModel, Document_details } from "./document-models";
import DocumentDal from "./document-dal";
import { v4 as uuidv4 } from 'uuid';

export default class DocumentService {
    constructor(private documentDal: DocumentDal) { }

    async createDocument(userID: string, path: string, title: string, content: string): Promise<Document_details> {
        const document: DocumentModel = {
            id: uuidv4(),
            author: userID,
            path: path,
            title: title,
            content: content,
            createdAt: new Date(),
            lastUpdatedAt: new Date(),
            lastUpdatedBy: userID
        };

        return await this.documentDal.createDocument(document);
    }

    async getAllDocuments(): Promise<Document_details[]> {
        return await this.documentDal.getAllDocuments();
    }

    async getDocumentById(id: string): Promise<DocumentModel> {
        return await this.documentDal.getDocumentById(id);
    }
    async updateDocument(document: DocumentModel, userId: string): Promise<DocumentModel> {
        document.lastUpdatedAt = new Date();
        document.lastUpdatedBy = userId; 
        return await this.documentDal.updateDocument(document);
    }
    async deleteDocument(id: string): Promise<void> {
        return await this.documentDal.deleteDocument(id);
    }
    async getDocumentForDownload(id: string): Promise<DocumentModel> {
        return this.documentDal.getDocumentById(id);
    }

}