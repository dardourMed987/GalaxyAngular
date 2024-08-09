import { Profile } from './Profile';
import { ModuleFormation } from './module-formation';

export class Formation {
  id!: number;
  description!: string;
  profile: Profile;
  imageUrl!: string;
  modules!: ModuleFormation[];
}
