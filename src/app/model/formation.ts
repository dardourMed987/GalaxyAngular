import { Profile } from './Profile';
import { ModuleFormation } from './module-formation';
import { User } from './user';

export class Formation {
  id!: number;
  description!: string;
  profile: Profile;
  imageUrl!: string;
  modules!: ModuleFormation[];
  utilisateurs!: User[];
}
