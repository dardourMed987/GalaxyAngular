import { discussion } from "./discussion";
import { Livrable } from "./livrable";
import { User } from "./user";

export class message {
  id!: number;
  message!: string;
  date!: Date;
  discussion!:discussion;
  utilisateur!:User
}
