

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

export interface Document{
    id:string;   
    author:string;  //user id
    path:string;
    title:string;
    content:string;
    createdAt:Date;
    lastUpdatedAt:Date;
    lastUpdatedBy:string;  //user id
}

export interface Document_details{
    id:string;
    author:string;  //user id
    path:string;
    title:string;
}