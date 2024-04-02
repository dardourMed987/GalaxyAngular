import { User } from './user';

export class Document {
  id!: number;
  operationDate!: Date;
  documentName!: string;
  documentUrl!: string;
  utilisateurs!: User[];
}
