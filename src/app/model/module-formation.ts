import { Formation } from './formation';

export class ModuleFormation {
  id!: number;
  operationDate!: Date;
  moduleName!: string;
  imageUrl!: string;
  formations!: Formation[];
  documents!: Document[];
}
