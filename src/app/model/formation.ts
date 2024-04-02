import { ModuleFormation } from './module-formation';

export class Formation {
  id!: number;
  operationDate!: Date;
  formationName!: string;
  imageUrl!: string;
  modules!: ModuleFormation[];
}
