export enum operationTipe{
    CREATE='CREATE',
    UPDATE='UPDATE',
    DELETE='DELETE'
}

export interface Operation{
    user: string;  //user id
    documentid:string;
    documentPath:string;
    documentAuthor:string;
    timestamp:Date;
    operationType:operationTipe
}