import { User } from './user';

export class Document {
  id!: number;
  documentName!: string;
  documentUrl!: string;
  utilisateurs!: User[];
}
